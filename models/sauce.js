//// Exemple class ////

const mongoose = require("mongoose");

const sauce = mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], ref: "User" },
  usersDisliked: { type: [String], ref: "User" },
});

module.exports = mongoose.model("Sauce", sauce);
