const express = require("express");
const { requireSigning, adminMiddleware } = require("../../common-middleware");
const { initialData } = require("../../controllers/admin/initialdata");
const router = express.Router();

//Routes
router.post("/initialData", requireSigning, adminMiddleware, initialData);

//Export file
module.exports = router;
