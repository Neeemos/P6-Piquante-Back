const express = require('express');
const router = express.Router();
const mongodb = require("../db");
const sauce = require("../models/sauce");
const multer = require("../middleware/multer-config");

router.get('/sauces', (req,res,next) => {
    console.log("On est dans le GET SAUCES");
    sauce
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
  });
  
  router.post('/sauces', multer, (req,res,next) => {
    console.log("On est dans le POST SAUCES");
    console.log(req.body);
  return;
    const newSauce = new sauce({
      ...req.body,
    });
    newSauce.save()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error("Error fetching sauces:", error);
      res.status(500).json({ error: "An error occurred while fetching sauces" });
    });
  });

  module.exports = router;