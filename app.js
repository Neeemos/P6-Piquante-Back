const express = require("express");
//// Handle MongoDb connexion ////
const mongodb = require("./db");
const user = require("./models/user");


const app = express();
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
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.post('/api/auth/login', (req, res, next) => {
  console.log('On est dans le POST');
  delete req.body._id;
  const newUser = new user({
    ...req.body
  });
  console.log(newUser);
  newUser.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'An error occurred while saving user' });
    });
});

app.get('/api/users', (req, res, next) => {
  console.log(req.params);
  user.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
});

app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
  console.log("stuff returned");
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
