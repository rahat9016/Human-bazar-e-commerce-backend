const express = require("express");
const { requireSigning, adminMiddleware } = require("../common-middleware");
const { addCategory, getCategories } = require("../controllers/category");
const router = express.Router();

router.post("/category/create", requireSigning, adminMiddleware, addCategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
