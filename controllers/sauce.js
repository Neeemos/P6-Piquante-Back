const sauce = require('../models/sauce');
const mongodb = require("../db");
const fs = require('fs');

exports.getAllSauce = (req,res,next) => {
    console.log("On est dans le GET SAUCES");
    sauce
    .find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
  }

exports.createSauce = (req,res,next) => {
    console.log("On est dans le POST AJOUT SAUCES");
    const imageObject = JSON.parse(req.body.sauce);
    delete imageObject._id;
    delete imageObject._userId;
    console.log(imageObject);
    const newSauce = new sauce({
        ...imageObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(newSauce);
    newSauce.save()
    .then(() => { res.status(201).json({message: 'Added successfully a new sauce'})})
    .catch(error => { res.status(400).json( { error })})

 
  }

 