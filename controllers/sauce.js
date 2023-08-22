const sauce = require("../models/sauce");
const fs = require("fs");

exports.getAllSauce = (req, res, next) => {
  console.log("On est dans le GET ALLSAUCES");
  sauce
    .find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
};

exports.createSauce = (req, res, next) => {
  console.log("On est dans le POST AJOUT SAUCES");
  const imageObject = JSON.parse(req.body.sauce);
  delete imageObject._id;
  delete imageObject._userId;
  const newSauce = new sauce({
    ...imageObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  newSauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Added successfully a new sauce" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getSauce = (req, res, next) => {
  console.log("On est dans le GET SAUCE");
  sauce
    .findOne({ _id: req.params.id })
    .then((foundsauce) => {
      if (foundsauce === null) {
        res.status(401).json({ message: "Sauce does not exist" });
      } else {
        res.status(201).json(foundsauce);
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.likeSauce = (req, res, next) => {
  console.log("On est dans les LIKE SAUCE");
  sauce
    .findOne({ _id: req.params.id })
    .then((foundsauce) => {
      if (foundsauce === null) {
        return res.status(404).json({ message: "Sauce not found" });
      }
      if (req.body.like > 0) {
        foundsauce.likes++;
        foundsauce.usersLiked.push(req.body.userId);
      } else if (req.body.like < 0) {
        foundsauce.dislikes++;
        foundsauce.usersDisliked.push(req.body.userId);
      } else if (req.body.like === 0) {
        const likedIndex = foundsauce.usersLiked.indexOf(req.body.userId);
        const dislikedIndex = foundsauce.usersDisliked.indexOf(req.body.userId);

        if (likedIndex !== -1) {
          foundsauce.likes--;
          foundsauce.usersLiked.splice(likedIndex, 1);
        } else if (dislikedIndex !== -1) {
          foundsauce.dislikes--;
          foundsauce.usersDisliked.splice(dislikedIndex, 1);
        }
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }

      sauce
        .updateOne(
          { _id: req.params.id },
          {
            likes: foundsauce.likes,
            dislikes: foundsauce.dislikes,
            usersLiked: foundsauce.usersLiked,
            usersDisliked: foundsauce.usersDisliked,
          }
        )
        .then(() => res.status(200).json({ message: "Like updated!" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateSauce = (req, res, next) => {
  console.log("On est dans le PUT SAUCE");
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce), 
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  delete sauceObject._userId;

  sauce.findOne({ _id: req.params.id }) 
    .then((foundSauce) => {
      if (foundSauce === null) {
        res.status(401).json({ message: "Sauce does not exist" });
      } else if (foundSauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce edited!" })) 
          .catch((error) => res.status(400).json({ error })); 
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


exports.deleteSauce = (req, res, next) => {
  console.log("On est dans le DELETE SAUCE");
  sauce.findOne({ _id: req.params.id})
  .then(foundSauce => {
      if (foundSauce.userId !== req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = foundSauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            sauce.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Sauce deleted !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
};