const express = require("express");
const {
  addNewMessage,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", addNewMessage);
router.get("/:conversationId", getMessages);

module.exports = router;
