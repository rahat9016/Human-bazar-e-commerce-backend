const express = require("express");
const { signing, signup } = require("../../controllers/admin/auth");
const {
  isRequestValidate,
  validateSigningRequest,
  validateSignupRequest,
} = require("../../validator/auth");
const router = express.Router();

//Routes
router.post(
  "/admin/signing",
  validateSigningRequest,
  isRequestValidate,
  signing
);
router.post("/admin/signup", validateSignupRequest, isRequestValidate, signup);

//Export file
module.exports = router;
