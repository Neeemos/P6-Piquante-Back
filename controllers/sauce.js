const sauce = require("../models/sauce");
const fs = require("fs");

exports.getAllSauce = (req, res, next) => {
  sauce
    .find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error: "An error occurred while fetching sauces" });
    });
};

exports.createSauce = (req, res, next) => {
  const imageObject = JSON.parse(req.body.sauce);
  delete imageObject._id;
  delete imageObject._userId;
  const newSauce = new sauce({
    ...imageObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`,
  });
  newSauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce added successfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getSauce = (req, res, next) => {
  sauce
    .findOne({ _id: req.params.id })
    .then((foundsauce) => {
      res.status(200).json(foundsauce);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.likeSauce = (req, res, next) => {
  sauce
    .findOne({ _id: req.params.id })
    .then((foundsauce) => {
      const alreadyLiked = foundsauce.usersLiked.includes(req.body.userId);
      const alreadyDisliked = foundsauce.usersDisliked.includes(req.body.userId);

      switch (req.body.like) {
        case -1:
          if (!alreadyDisliked) {
            foundsauce.dislikes++;
            foundsauce.usersDisliked.push(req.body.userId);
          } else {
            return res.status(200).json({ message: "Already disliked!" });
          }
          if (alreadyLiked) {
            foundsauce.likes--;
            foundsauce.usersLiked.splice(
              foundsauce.usersLiked.indexOf(req.body.userId),
              1
            );
          }
          break;
        case 1:
          if (!alreadyLiked) {
            foundsauce.likes++;
            foundsauce.usersLiked.push(req.body.userId);
          } else {
            return res.status(200).json({ message: "Already liked!" });
          }
          if (alreadyDisliked) {
            foundsauce.dislikes--;
            foundsauce.usersDisliked.splice(
              foundsauce.usersDisliked.indexOf(req.body.userId),
              1
            );
          }
          break;
        case 0:
          let like = false;
          if (alreadyLiked) {
            like = true;
            foundsauce.likes--;
            foundsauce.usersLiked.splice(
              foundsauce.usersLiked.indexOf(req.body.userId),
              1
            );
          }
          if (alreadyDisliked) {
            like = true;
            foundsauce.dislikes--;
            foundsauce.usersDisliked.splice(
              foundsauce.usersDisliked.indexOf(req.body.userId),
              1
            );
          }
          if (!like) {
            return res.status(200).json({ message: "Not liked or Disliked" });
          }
          break;
        default:
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
  const sauceObject = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };

  delete sauceObject._userId;

  sauce
    .findOne({ _id: req.params.id })
    .then((foundSauce) => {
      if (foundSauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        sauce
          .updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id, userId: req.auth.userId }
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
  sauce
    .findOne({ _id: req.params.id })
    .then((foundSauce) => {
      if (foundSauce.userId !== req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = foundSauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          sauce
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(204).send();
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
