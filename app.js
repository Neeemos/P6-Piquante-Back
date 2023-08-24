const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require('path');
const mongoose = require("mongoose");
require('dotenv').config();
/// Header  Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//// Handle app.get / app.post ///
app.use(express.json());



// Cas de réussite ou d'échec de connexion
mongoose
  .connect(process.env.URL_DB)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Échec de connexion à MongoDB…", err));

module.exports = { mongoose };

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});





app.use('/api/auth',  userRoutes);
app.use('/api',  sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
