const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const ReviewModel = require("../models/reviewModel");
const Stripe = require("stripe");

// Create a new booking
const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  // Check if the service provider is trying to book their own service
  if (service.userId.equals(req.user._id)) {
    return next(new ErrorHandler("You cannot book your own service", 403));
  }

  // Check if the user already has a pending booking for this service
  const existingBooking = await BookingModel.findOne({
    serviceId: service._id,
    buyerId: req.user._id,
    status: { $in: ["pending"] },
  });

  if (existingBooking) {
    return next(
      new ErrorHandler(
        "You already have a pending booking for this service",
        400
      )
    );
  }

  // Create a new booking document
  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
    iserviceProviderId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    isCompleted: true,
  });

  // Save the new booking
  await newBooking.save();

  res.status(200).json({
    msg: "Successful",
  });
});

// Get bookings based on user role (buyer or service provider)
const getBooking = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 7; // Number of documents per page

  const skip = (page - 1) * limit; // Number of documents to skip

  const query = {
    ...(req.isServiceProvider
      ? { iserviceProviderId: req.user._id }
      : { buyerId: req.user._id }),
  };

  // Get total number of documents matching the query
  const totalDocuments = await BookingModel.countDocuments(query);

  const totalPages = Math.ceil(totalDocuments / limit); // Total number of pages

  // Get bookings with pagination and populate related fields
  const bookings = await BookingModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("buyerId", "avatar name address")
    .populate("iserviceProviderId", "avatar name address");

  res.json({
    currentPage: page,
    totalPages,
    data: bookings,
  });
});

// Update booking status
const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Update the booking status
  const updatedBooking = await BookingModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedBooking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json({ booking: updatedBooking });
});

// Create a payment intent for a booking
const createPaymentIntent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const stripe = new Stripe(process.env.STRIPE);
  const booked = await BookingModel.findById(id);

  // Create a payment intent with the specified amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booked.price * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // Update the booking with payment details and status
  const updatedBooking = await BookingModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        payment: paymentIntent.id,
        status: "completed",
      },
    },
    {
      new: true,
    }
  );

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Confirm a booking
const confirm = catchAsync(async (req, res, next) => {
  const booking = await BookingModel.findOneAndUpdate(
    {
      payment: req.body.payment_intent,
    },
    {
      $set: {
        status: "completed",
      },
    },
    {
      new: true,
    }
  );

  console.log(booking, "from order");
  res.status(200).json("Order has been confirmed.");
});

module.exports = {
  createBooking,
  getBooking,
  createPaymentIntent,
  confirm,
  updateBookingStatus,
};
