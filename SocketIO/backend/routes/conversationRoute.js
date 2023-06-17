const express = require("express");
const {
  addNewConversation,
  getConversation,
  getConversationTwoUser,
} = require("../controllers/convresationController");

const router = express.Router();

// New conversation
router.post("/", addNewConversation);

// Get conversation of user
router.get("/:userId", getConversation);

// Get Conversation between two user
router.get("/:firstUserId/:secondUserId", getConversationTwoUser);

module.exports = router;
