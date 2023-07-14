const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const ReviewModel = require("../models/reviewModel");

const getServiceProviderDashboard = async (req, res) => {
  const serviceProviderId = req.user._id;
console.log("inside dashboarad")
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

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
   getServiceProviderDashboard 
}