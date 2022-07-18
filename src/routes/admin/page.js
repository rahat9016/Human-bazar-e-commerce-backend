const express = require("express");
const {
  upload,
  requireSigning,
  adminMiddleware,
} = require("../../common-middleware");
const { createPage } = require("../../controllers/page");
const router = express.Router();

router.post(
  "/page/create",
  requireSigning,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = router;
