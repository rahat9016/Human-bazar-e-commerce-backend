const express = require("express");
const router = express.Router();
const { signup, signing, requireSigning } = require("../controllers/auth");

//Routes
router.post("/signing", signing);
router.post("/signup", signup);

router.post("/profile", requireSigning, (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});
//Export file
module.exports = router;
