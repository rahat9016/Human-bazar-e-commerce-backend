const express = require("express");
const { requireSigning, userMiddleware } = require("../common-middleware");
const { addItemToCart, getCartItems } = require("../controllers/cart");
const router = express.Router();

router.post(
  "/user/cart/addToCart",
  requireSigning,
  userMiddleware,
  addItemToCart
);
router.post("/user/getCartItems", requireSigning, userMiddleware, getCartItems);
// router.get("/category/getCategory", getCategories);

module.exports = router;
