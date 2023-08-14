const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');


router.post("/signup", ctrlUser.createUser);

  router.post("/login", ctrlUser.loginUser);

  router.get("/users", ctrlUser.getAllUser);

  module.exports = router;