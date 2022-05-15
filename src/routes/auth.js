const express = require("express");
const { requireSigning } = require("../common-middleware");
const router = express.Router();
const { signup, signing } = require("../controllers/auth");
const {
  validateSignupRequest,
  isRequestValidate,
  validateSigningRequest,
} = require("../validator/auth");

//Routes
router.post("/signing", validateSigningRequest, isRequestValidate, signing);
router.post("/signup", validateSignupRequest, isRequestValidate, signup);

//Export file
module.exports = router;
