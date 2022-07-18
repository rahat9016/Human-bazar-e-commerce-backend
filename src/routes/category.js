const express = require("express");
const { requireSigning, adminMiddleware } = require("../common-middleware");
const {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/category");
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const router = express.Router();
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
  "/category/create",
  requireSigning,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getCategory", getCategories);
router.post(
  "/category/update",
  requireSigning,
  adminMiddleware,
  upload.array("categoryImage"),
  updateCategories
);
router.post(
  "/category/delete",
  requireSigning,
  adminMiddleware,
  deleteCategories
);
module.exports = router;
