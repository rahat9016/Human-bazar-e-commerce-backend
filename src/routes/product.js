const express = require("express");
const { requireSigning, adminMiddleware } = require("../common-middleware");
const { addProduct, getProductBySlug } = require("../controllers/product");
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/product/create",
  requireSigning,
  adminMiddleware,
  upload.array("productPicture"),
  addProduct
);
router.get("/products/:slug", getProductBySlug);

module.exports = router;
