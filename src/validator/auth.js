const { check, validationResult } = require("express-validator");
exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
];
exports.validateSigningRequest = [
  check("email").isEmail().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
];

exports.isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
