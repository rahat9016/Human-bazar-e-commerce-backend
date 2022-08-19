const express = require("express");
const { requireSigning, userMiddleware } = require("../common-middleware");
const { addAddress, getAddress } = require("../controllers/address");

const router = express.Router();

router.post("/user/address/create", requireSigning, userMiddleware, addAddress);
router.post("/user/getAddress", requireSigning, userMiddleware, getAddress);

module.exports = router;
