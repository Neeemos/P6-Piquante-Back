const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new user({
      email: req.body.email,
      password: hash,
    });
    newUser
      .save()
      .then((registeredUser) => {
        res.status(201).json({ message: "registered successfully" });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.loginUser = (req, res, next) => {
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Verify credentials" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Verify credentials" });
    });
};
