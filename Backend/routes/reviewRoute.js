const isAuthenticated = require("../middleware/validate");

const express = require("express");
const reviewController = require("../controller/reviewController");

const router = express.Router();

router.route("/").post(isAuthenticated,reviewController.createReview)
router.route("/:id").get(reviewController.getReviews).delete(reviewController.deleteReview);

module.exports = router