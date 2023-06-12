const isAuthenticated = require("../middleware/validate");

const express = require("express");
const {createReview,getReviews,deleteReview} = require("../controller/reviewController");

const router = express.Router();

router.route("/").post(isAuthenticated,createReview)
router.route("/:id").get(getReviews).delete(deleteReview);

module.exports = router