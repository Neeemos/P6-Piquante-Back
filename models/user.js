//// Exemple class ////

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "user", // Specify the collection name
  }
);

module.exports = mongoose.model("user", userSchema);
