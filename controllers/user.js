const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  console.log("On est dans le POST REGISTER");
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new user({
      email: req.body.email,
      password: hash,
    });
    console.log(newUser);
    newUser
      .save()
      .then((registeredUser) => {
        if (registeredUser) {
          res.status(201).json({ message: "registered successfully" });
        } else {
          res.status(400).json({ error: "Verify credentials" });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
};
exports.loginUser = (req, res, next) => {
  console.log("On est dans le POST LOGIN");
  user.findOne({ email: req.body.email }).then((user) => {
    if (user === null) {
      res.status(401).json({ message: "Wrong email/password" });
    } else {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Wrong email/password" });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id, },               
                process.env.TOKEN_SECRET,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
};

exports.getAllUser = (req, res, next) => {
  console.log(req.params);
  user
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
};
