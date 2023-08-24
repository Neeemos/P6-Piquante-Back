const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const ctrlSauce = require("../controllers/sauce");
const auth = require("../middleware/auth");
const {  validateSauce , checkValidationResult} = require("../middleware/validator");


router.get('/sauces',  auth, ctrlSauce.getAllSauce);
router.post('/sauces', auth, multer, validateSauce, checkValidationResult,  ctrlSauce.createSauce);

router.get('/sauces/:id',  auth, multer, ctrlSauce.getSauce);
router.put('/sauces/:id',  auth, multer, validateSauce, checkValidationResult, ctrlSauce.updateSauce);
router.delete('/sauces/:id',  auth, multer, ctrlSauce.deleteSauce);

router.post('/sauces/:id/like',  auth, multer, ctrlSauce.likeSauce);


  module.exports = router;