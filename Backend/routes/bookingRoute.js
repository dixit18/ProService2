const express = require("express");
const isAuthenticated = require("../middleware/validate");
const bookingController = require("../controller/bookingController");

const router = express.Router();
router.route("/").get(isAuthenticated, bookingController.getBooking).put(isAuthenticated,bookingController.confirm);
router
  .route("/create-payment-intent/:id")
  .post(isAuthenticated, bookingController.createPaymentIntent)
 ;
// router.route("/:id").post(isAuthenticated, bookingController.createBooking);
router.route("/:id").post(isAuthenticated,bookingController.createBooking)
router.route("/:id").patch(bookingController.updateBooking)

module.exports = router;
