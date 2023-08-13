const express = require('express');
const user = require("../models/user");
const router = express.Router();
const mongodb = require("../db");

router.post("/signup", (req, res, next) => {
    console.log("On est dans le POST REGISTER");
    delete req.body._id;
    const newUser = new user({
      ...req.body,
    });
    console.log(newUser);
    newUser.save()
      .then((registeredUser) => {
        if (registeredUser) {
          res.status(200).json({ message: "registered successfully" });
        } else {
          res.status(401).json({ error: "Verify credentials" });
        }
      })
      .catch((error) => {
        console.error("Error during register:", error);
        res.status(500).json({ error: "An error occurred during login" });
      });
  });

  router.post("/login", (req, res, next) => {
    console.log("On est dans le POST LOGIN");
    delete req.body._id;
    const userLogin = new user({
      ...req.body,
    });
    console.log(userLogin);
    user.findOne({ email: userLogin.email, password: userLogin.password })
      .then((foundUser) => {
        if (foundUser) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred during login" });
      });
  });

  router.get("/users", (req, res, next) => {
    
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
  });

  module.exports = router;