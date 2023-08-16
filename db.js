const mongoose = require("mongoose");
require('dotenv').config();

// Cas de réussite ou d'échec de connexion
mongoose
  .connect(process.env.URL_DB)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Échec de connexion à MongoDB…", err));

module.exports = { mongoose };