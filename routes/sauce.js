const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const ctrlSauce = require("../controllers/sauce");
const auth = require("../middleware/auth");


const {
  validateSauce,
  checkValidationResult
} = require("../middleware/validator");

router.get('/',  auth, ctrlSauce.getAllSauce);
router.post('/', auth, multer, validateSauce, checkValidationResult,  ctrlSauce.createSauce);

router.get('/:id',  auth, multer, ctrlSauce.getSauce);
router.put('/:id',  auth, multer, validateSauce, checkValidationResult, ctrlSauce.updateSauce);
router.delete('/:id',  auth, multer, ctrlSauce.deleteSauce);

router.post('/:id/like',  auth, multer, ctrlSauce.likeSauce);


module.exports = router;