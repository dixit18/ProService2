const ServiceModel = require("../models/serviceModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const { query } = require("express");

// Create a service
const createService = catchAsync(async (req, res, next) => {
  if (!req.isServiceProvider)
    return next(
      new ErrorHandler("Only Service Provider can create a service.", 403)
    );

  // Create a new service with the provided data
  const newService = new ServiceModel({
    userId: req.user._id,
    ...req.body,
  });

  // Save the service to the database
  const savedService = await newService.save();
  console.log(savedService);

  res.status(201).json(savedService);
});

// Delete a service
const deleteService = catchAsync(async (req, res, next) => {
  // Find the service by ID
  const service = await ServiceModel.findById(req.params.id);

  // Check if the user owns the service
  if (service.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can only delete your own service.", 403));
  }

  // Delete the service from the database
  await ServiceModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    msg: "Service has been deleted.",
  });
});

// Get a single service
const getService = catchAsync(async (req, res, next) => {
  // Find the service by ID
  const service = await ServiceModel.findById(req.params.id);
  if (!service) next(new ErrorHandler("Service not found.", 404));

  res.status(200).json({ service });
});

// Get services with pagination and filters
const getServices = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4; // Adjust the limit as per your preference

  // Construct the filters based on query parameters
  const queryObj = req.query;
  const filters = {
    ...(queryObj.userId && { userId: queryObj.userId }),
    ...(queryObj.category && { category: queryObj.category }),
    ...((queryObj.min || queryObj.max) && {
      price: {
        ...(queryObj.min && { $gt: queryObj.min }),
        ...(queryObj.max && { $lt: queryObj.max }),
      },
    }),
    ...(queryObj.search && {
      title: { $regex: queryObj.search, $options: 'i' },
    }),
    ...(queryObj.city && { city: queryObj.city }), 
  };

  // Find services based on filters, sort, and pagination
  const services = await ServiceModel.find(filters)
    .sort({ [queryObj.sort]: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // Count the total number of services matching the filters
  const totalServices = await ServiceModel.countDocuments(filters);
  const totalPages = Math.ceil(totalServices / limit);

  if (!services) next(new ErrorHandler('No services found.', 404));

  console.log(services, "services");
  res.status(200).json({
    services,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
    },
  });
});

module.exports = {
  createService,
  deleteService,
  getService,
  getServices,
};
