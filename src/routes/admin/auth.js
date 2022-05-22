const express = require("express");
const { requireSigning } = require("../../common-middleware");
const { signing, signup, signout } = require("../../controllers/admin/auth");
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

router.post("/admin/signout", requireSigning, signout);
//Export file
module.exports = router;
