const express = require("express");
const {
  signup,
  login,
  logout,
  protect,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", protect);
router.get("/:userId", getUserById);

module.exports = router;
