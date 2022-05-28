const express = require("express");
const { initialData } = require("../../controllers/admin/initialdata");
const router = express.Router();

//Routes
router.post("/initialData", initialData);

//Export file
module.exports = router;
