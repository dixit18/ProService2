const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const Stripe = require("stripe")
const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
     iserviceProviderId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    // payment: paymentIntent.id,
    isCompleted: true
  });

  await newBooking.save();

  res.status(200).json({
    msg: "successfull",
  });
});



// const getBooking = catchAsync(async (req, res, next) => {
//     const booking = await BookingModel.find({
//         ...(req.isServiceProvider?{ iserviceProviderId:req.user._id}:{buyerId:req.user._id}),
//         isCompleted:true

//     })

//     console.log(booking,"hello there")
//     res.status(200).json({
//         booking
//     })
// })

const getBooking = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 5; // Number of documents per page

  const skip = (page - 1) * limit; // Number of documents to skip

  const totalDocuments = await BookingModel.countDocuments({
    ...(req.isServiceProvider ? { iserviceProviderId: req.user._id } : { buyerId: req.user._id }),
    isCompleted: true
  });

  const totalPages = Math.ceil(totalDocuments / limit); // Total number of pages

  const booking = await BookingModel.find({
    ...(req.isServiceProvider ? { iserviceProviderId: req.user._id } : { buyerId: req.user._id }),
    isCompleted: true
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    currentPage: page,
    totalPages,
    data: booking
  });

});


// Update order status
const updateBooking = catchAsync (async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
console.log(status)
    // Perform any necessary validation or authorization checks

    // Update the order status
    const updatedOrder = await BookingModel.findByIdAndUpdate(
id    ,  { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order: updatedOrder });
  
});


const createPaymentIntent = async(req,res,next)=>{
const stripe = new Stripe(process.env.STRIPE)
const service = await ServiceModel.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(service.price *100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
     iserviceProviderId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    payment: paymentIntent.id,
  });
  
// const id = req.params.id
//   // await newBooking.save();
//   const newBooking = await BookingModel.findOneAndUpdate(
//     { _id:id}, 
//     { new: true } 
//   );
  
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}
const confirm = async(req,res,next)=>{
  console.log("req",req.body)
  const orders = await BookingModel.findOneAndUpdate(
    {
      payment: req.body.payment_intent,
    },
    {
      $set: {
        isCompleted: true,
      },
    }, {
      new: true
    }
  );
console.log(orders);
  res.status(200).json("Order has been confirmed.");
}
module.exports = {
  createBooking,
  getBooking,createPaymentIntent,confirm,
  updateBooking
};
