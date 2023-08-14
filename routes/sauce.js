const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const ctrlSauce = require("../controllers/sauce");
const auth = require("../middleware/auth");

router.get('/sauces', auth, ctrlSauce.getAllSauce);
  
router.post('/sauces',  auth, multer, ctrlSauce.createSauce);

  module.exports = router;