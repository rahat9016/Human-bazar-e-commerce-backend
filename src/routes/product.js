const express = require("express");
const { requireSigning, adminMiddleware } = require("../common-middleware");
const { addProduct } = require("../controllers/product");
const router = express.Router();

router.post("/product/create", requireSigning, adminMiddleware, addProduct);
router.get("/product/getProduct");

module.exports = router;
