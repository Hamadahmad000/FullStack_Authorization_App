const { check, validationResult } = require("express-validator");

const userValidation = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 character longer!"),
  check("email").normalizeEmail().isEmail().withMessage("Inavalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password must be required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters longer!"),
];
const userSignInValidation = [
  check("email").normalizeEmail().isEmail().withMessage("Inavalid Email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password must be required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters longer!"),
];

const userValidationResult = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(400).json({ success: false, error: error[0].msg });
};

module.exports = { userValidation, userValidationResult, userSignInValidation };
