const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const ctrlSauce = require("../controllers/sauce");
const auth = require("../middleware/auth");

router.get('/sauces', auth, ctrlSauce.getAllSauce);
router.post('/sauces',  auth, multer, ctrlSauce.createSauce);

router.get('/sauces/:id',  auth, multer, ctrlSauce.getSauce);
router.put('/sauces/:id',  auth, multer, ctrlSauce.updateSauce);
router.delete('/sauces/:id',  auth, multer, ctrlSauce.deleteSauce);

router.post('/sauces/:id/like',  auth, multer, ctrlSauce.likeSauce);


  module.exports = router;