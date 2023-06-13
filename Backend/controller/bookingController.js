const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const Stripe = require("stripe")


const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

if (service.userId.equals(req.user._id)) {
  return next(new ErrorHandler("You can not book your own service",403))
}
const existingBooking = await BookingModel.findOne({
  serviceId: service._id,
  buyerId: req.user._id,
  status: { $in: ["pending"] },
});

if (existingBooking) {
  return next(new ErrorHandler("You already have a pending booking for this service", 400));
}

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
     iserviceProviderId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    isCompleted: true
  });

  await newBooking.save();

  res.status(200).json({
    msg: "successfull",
  });
});



const getBooking = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 9; // Number of documents per page

  const skip = (page - 1) * limit; // Number of documents to skip

  const query = {
    ...(req.isServiceProvider ? { iserviceProviderId: req.user._id } : { buyerId: req.user._id }),
  };

  const totalDocuments = await BookingModel.countDocuments(query);

  const totalPages = Math.ceil(totalDocuments / limit); // Total number of pages

  const booking = await BookingModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    currentPage: page,
    totalPages,
    data: booking,
  });
});

const updateBooking = catchAsync (async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
console.log(status)

    const updatedOrder = await BookingModel.findByIdAndUpdate(
id    ,  { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order: updatedOrder });
  
});


const createPaymentIntent =catchAsync( async(req,res,next)=>{
  const {id}= req.params
const stripe = new Stripe(process.env.STRIPE)
const booked = await BookingModel.findById(id);

console.log(booked,"service")

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booked.price *100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const BookingPayment = await BookingModel.findOneAndUpdate({
    _id: id,
  },
  {
    $set: {
      payment: paymentIntent.id,
      status:"completed"
    },
  }, {
    new: true
  }
  );
  
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
})
const confirm = catchAsync(async(req,res,next)=>{

  
  
  const booking = await BookingModel.findOneAndUpdate(
    {
      payment: req.body.payment_intent,
    },
    {
      $set: {
        status: "completed",
      },
    }, {
      new: true
    }
  );
console.log(booking,"from order");
  res.status(200).json("Order has been confirmed.");
})
module.exports = {
  createBooking,
  getBooking,createPaymentIntent,confirm,
  updateBooking
};
