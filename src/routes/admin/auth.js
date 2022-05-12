const express = require("express");
const { signing, signup } = require("../../controllers/admin/auth");
const router = express.Router();

//Routes
router.post("/admin/signing", signing);
router.post("/admin/signup", signup);

//Export file
module.exports = router;
