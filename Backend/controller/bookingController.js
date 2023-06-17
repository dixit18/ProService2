const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const ReviewModel = require("../models/reviewModel");
const Stripe = require("stripe");

const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  if (service.userId.equals(req.user._id)) {
    return next(new ErrorHandler("You can not book your own service", 403));
  }
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

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
    iserviceProviderId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    isCompleted: true,
  });

  await newBooking.save();

  res.status(200).json({
    msg: "successfull",
  });
});

const getBooking = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = 7; // Number of documents per page

  const skip = (page - 1) * limit; // Number of documents to skip

  const query = {
    ...(req.isServiceProvider
      ? { iserviceProviderId: req.user._id }
      : { buyerId: req.user._id }),
  };

  const totalDocuments = await BookingModel.countDocuments(query);

  const totalPages = Math.ceil(totalDocuments / limit); // Total number of pages

  const booking = await BookingModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("buyerId", "avatar name address")
    .populate("iserviceProviderId", "avatar name address");

  res.json({
    currentPage: page,
    totalPages,
    data: booking,
  });
});

const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status);

  const updatedOrder = await BookingModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json({ order: updatedOrder });
});

const createPaymentIntent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const stripe = new Stripe(process.env.STRIPE);
  const booked = await BookingModel.findById(id);

  console.log(booked, "service");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(booked.price * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const BookingPayment = await BookingModel.findOneAndUpdate(
    {
      _id: id,
    },
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

// const getServiceProviderDashboard = async (req, res) => {
//   const serviceProviderId = req.user._id; // Assuming you have authentication middleware to get the current user's ID

//   try {
//     // Total Booking of Service Provider
//     const totalBooking = await BookingModel.countDocuments({ iserviceProviderId: serviceProviderId });

//     // Total Revenue of Service Provider
//     const totalRevenue = await BookingModel.aggregate([
//       { $match: { iserviceProviderId: serviceProviderId, status: 'completed' } },
//       { $group: { _id: null, total: { $sum: "$price" } } }
//     ]);

//     // Monthly Review of Service Provider
//     const currentMonth = new Date().getMonth() + 1;
//     const monthlyReview = await reviewModel.countDocuments({
//       userId: serviceProviderId,
//       createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1) }
//     });

//     // Monthly Completed Request
//     const monthlyCompletedRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: 'completed',
//       createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1) }
//     });

//     // Monthly Revenue of Service Provider
//     const monthlyRevenue = await BookingModel.aggregate([
//       { $match: { iserviceProviderId: serviceProviderId, status: 'completed', createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1) } } },
//       { $group: { _id: null, total: { $sum: "$price" } } }
//     ]);

//     // Today's Pending Request
//     const todayPendingRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: 'pending',
//       createdAt: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) }
//     });

//     // Today's Completed Request
//     const todayCompletedRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: 'completed',
//       createdAt: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) }
//     });

//     // Today's Revenue
//     const todayRevenue = await BookingModel.aggregate([
//       { $match: { iserviceProviderId: serviceProviderId, status: 'completed', createdAt: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) } } },
//       { $group: { _id: null, total: { $sum: "$price" } } }
//     ]);

//     // Prepare the response
//     const dashboardData = {
//       totalBooking,
//       totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
//       monthlyReview,
//       monthlyCompletedRequest,
//       monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
//       todayPendingRequest,
//       todayCompletedRequest,
//       todayRevenue: todayRevenue.length > 0 ? todayRevenue[0].total : 0
//     };

//     res.json(dashboardData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getServiceProviderDashboard = async (req, res) => {
//   const serviceProviderId = req.user._id; // Assuming you have authentication middleware to get the current user's ID

//   try {
//     // Total Booking of Service Provider
//     const totalBooking = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//     });

//     // Total Revenue of Service Provider
//     const totalRevenue = await BookingModel.aggregate([
//       {
//         $match: { iserviceProviderId: serviceProviderId, status: "completed" },
//       },
//       { $group: { _id: null, total: { $sum: "$price" } } },
//     ]);

//     // Monthly Review of Service Provider
//     const currentYear = new Date().getFullYear();
//     const currentMonth = new Date().getMonth() + 1;
//     const monthlyReview = await ReviewModel.countDocuments({
//       userId: serviceProviderId,
//       createdAt: {
//         $gte: new Date(currentYear, currentMonth - 1, 1),
//         $lt: new Date(currentYear, currentMonth, 1),
//       },
//     });

//     // Monthly Completed Request
//     const monthlyCompletedRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: "completed",
//       createdAt: {
//         $gte: new Date(currentYear, currentMonth - 1, 1),
//         $lt: new Date(currentYear, currentMonth, 1),
//       },
//     });

//     // Monthly Revenue of Service Provider
//     const monthlyRevenue = await BookingModel.aggregate([
//       {
//         $match: {
//           iserviceProviderId: serviceProviderId,
//           status: "completed",
//           createdAt: { $gte: new Date(currentYear, currentMonth - 1, 1) },
//         },
//       },
//       { $group: { _id: null, total: { $sum: "$price" } } },
//     ]);

//     // Today's Pending Request
//     const todayPendingRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: "pending",
//       createdAt: {
//         $gte: new Date().setHours(0, 0, 0, 0),
//         $lt: new Date().setHours(23, 59, 59, 999),
//       },
//     });

//     // Today's Completed Request
//     const todayCompletedRequest = await BookingModel.countDocuments({
//       iserviceProviderId: serviceProviderId,
//       status: "completed",
//       createdAt: {
//         $gte: new Date().setHours(0, 0, 0, 0),
//         $lt: new Date().setHours(23, 59, 59, 999),
//       },
//     });

//     // Today's Revenue
//     const todayRevenue = await BookingModel.aggregate([
//       {
//         $match: {
//           iserviceProviderId: serviceProviderId,
//           status: "completed",
//           createdAt: {
//             $gte: new Date().setHours(0, 0, 0, 0),
//             $lt: new Date().setHours(23, 59, 59, 999),
//           },
//         },
//       },
//       { $group: { _id: null, total: { $sum: "$price" } } },
//     ]);


//     const dashboardData = {
//       totalBooking,
//       totalRevenue,
//       monthlyCompletedRequest,
//       monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
//       todayPendingRequest,
//       todayCompletedRequest,
//       todayRevenue: todayRevenue.length > 0 ? todayRevenue[0].total : 0,
     
//     };

//     res.json(dashboardData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const getServiceProviderDashboard = async (req, res) => {
  const serviceProviderId = req.user._id; // Assuming you have authentication middleware to get the current user's ID

  try {
    // Total Booking of Service Provider
    const totalBooking = await BookingModel.countDocuments({
      iserviceProviderId: serviceProviderId,
    });

    // Total Revenue of Service Provider
    const totalRevenue = await BookingModel.aggregate([
      {
        $match: { iserviceProviderId: serviceProviderId, status: "completed" },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    // Monthly Review of Service Provider
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const monthlyReview = await ReviewModel.countDocuments({
      userId: serviceProviderId,
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    // Monthly Completed Request
    const monthlyCompletedRequest = await BookingModel.countDocuments({
      iserviceProviderId: serviceProviderId,
      status: "completed",
      createdAt: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    // Monthly Revenue of Service Provider
    const monthlyRevenue = await BookingModel.aggregate([
      {
        $match: {
          iserviceProviderId: serviceProviderId,
          status: "completed",
          createdAt: { $gte: new Date(currentYear, currentMonth - 1, 1) },
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    // Today's Pending Request
    const todayPendingRequest = await BookingModel.countDocuments({
      iserviceProviderId: serviceProviderId,
      status: "pending",
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    // Today's Completed Request
    const todayCompletedRequest = await BookingModel.countDocuments({
      iserviceProviderId: serviceProviderId,
      status: "completed",
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    // Today's Revenue
    const todayRevenue = await BookingModel.aggregate([
      {
        $match: {
          iserviceProviderId: serviceProviderId,
          status: "completed",
          createdAt: {
            $gte: new Date().setHours(0, 0, 0, 0),
            $lt: new Date().setHours(23, 59, 59, 999),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    // Generate bar chart data for the last 7 days
    const currentDate = new Date();
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      const completedRequests = await BookingModel.countDocuments({
        iserviceProviderId: serviceProviderId,
        status: "completed",
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });
      labels.push(date.toLocaleString("en-us", { weekday: "short" }));
      data.push(completedRequests);
    }
    const chartData = {
      labels,
      data,
    };
    // Generate pie chart data for status distribution

    const statusDistribution = await BookingModel.aggregate([
      {
        $match: {
          iserviceProviderId: serviceProviderId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const chartDataForPie = statusDistribution.map((status) => ({
      value: status.count,
      name: status._id,
    }));
    const dashboardData = {
      totalBooking,
      totalRevenue,
      monthlyCompletedRequest,
      monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
      todayPendingRequest,
      todayCompletedRequest,
      todayRevenue: todayRevenue.length > 0 ? todayRevenue[0].total : 0,
      chartData,
      chartDataForPie
    };
console.log(dashboardData)
    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  createBooking,
  getBooking,
  createPaymentIntent,
  confirm,
  updateBookingStatus,
  getServiceProviderDashboard,
  
};
