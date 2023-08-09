const mongoose = require("mongoose");

// Identification pour connexion au serveur
const uri = "mongodb+srv://neeemos01:UH4j3wmCAgHYSvUz@piquante.4pia1oi.mongodb.net/?retryWrites=true&w=majority";

// Cas de réussite ou d'échec de connexion
mongoose
  .connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Échec de connexion à MongoDB…", err));

module.exports = { mongoose };