const isAuthenticated = require("../middleware/validate");

const express = require("express");
const {createReview,getReviews} = require("../controller/reviewController");

const router = express.Router();

router.route("/").post(isAuthenticated,createReview)
router.route("/:id").get(getReviews)

module.exports = router