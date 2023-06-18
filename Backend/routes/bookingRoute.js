const express = require("express");
const isAuthenticated = require("../middleware/validate");
const {getBooking,confirm,createPaymentIntent,createBooking,updateBookingStatus} = require("../controller/bookingController");

const router = express.Router();
router.route("/").get(isAuthenticated, getBooking).put(isAuthenticated,confirm);
router
  .route("/create-payment-intent/:id")
  .post(isAuthenticated, createPaymentIntent)
 ;

router.route("/:id").post(isAuthenticated,createBooking)
router.route("/:id").patch(updateBookingStatus)

module.exports = router;
