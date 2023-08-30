const express = require("express");
const router = express.Router();
const ctrlUser = require("../controllers/user");

const {
    validateRegistration,
    validateLogin,
    checkValidationResult
} = require("../middleware/validator");

router.post("/signup", validateRegistration, checkValidationResult, ctrlUser.createUser);

router.post("/login", validateLogin, checkValidationResult, ctrlUser.loginUser);


module.exports = router;
