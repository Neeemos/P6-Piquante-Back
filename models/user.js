//// Exemple class ////

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "user", // Specify the collection name
  }
);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
