const { body, validationResult } = require("express-validator");

exports.validateRegistration = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

exports.validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

exports.validateSauce = (req, res, next) => {
  if (req.file) {
    body("sauce.name").notEmpty().isString();
    body("sauce.manufacturer").notEmpty().isString();
    body("sauce.description").notEmpty().isString();
    body("sauce.mainPepper").notEmpty().isString();
    body("sauce.heat").notEmpty().isNumeric();
  } else {
    body("name").notEmpty().isString();
    body("manufacturer").notEmpty().isString();
    body("description").notEmpty().isString();
    body("mainPepper").notEmpty().isString();
    body("heat").notEmpty().isNumeric();
  }
  next();
};
//

exports.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
