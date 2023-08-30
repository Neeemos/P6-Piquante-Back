const express = require("express");
const app = express();
const path = require('path');

const route = require("./routes/index");

const db = require('./models/index')

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


app.use((req, res, next) => {
  res.status(201);
  next();
});


app.use('/api',  route);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
