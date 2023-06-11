const ServiceModel = require("../models/serviceModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

const { query } = require("express");

const createService = catchAsync(async (req, res, next) => {
  if (!req.isServiceProvider)
    return next(
      new ErrorHandler("only Service Provider can create a service", 403)
    );

  const newService = new ServiceModel({
    userId: req.user._id,
    ...req.body,
  });

  const savedService = await newService.save();
  console.log(savedService);

  res.status(201).json(savedService);
});
const deleteService = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  if (service.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("you can delete only your service", 403));
  }

  await ServiceModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    msg: "service has been deleted",
  });
});


const getService = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) next(new ErrorHandler("service not found", 404));

  res.status(200).json({ service });
});
// const getServices = catchAsync(async (req, res, next) => {
//   const queryObj = req.query;

//   const filters = {
//     ...(queryObj.userId && { userId: queryObj.userId }),
//     ...(queryObj.category && { category: queryObj.category }),
//     ...((queryObj.min || queryObj.max) && {
//       price: {
//         ...(queryObj.min && { $gt: queryObj.min }),
//         ...(queryObj.max && { $lt: queryObj.max }),
//       },
//     }),
//     ...(queryObj.search && {
//       title: { $regex: queryObj.search, $options: "i" },
//     }),
//   };
//   const services = await ServiceModel.find(filters).sort({
//     [queryObj.sort]: -1,
//   });

//   if (!services) next(new ErrorHandler("no services found", 404));

//   res.status(200).json({ services });
// });
const getServices = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4; // Adjust the limit as per your preference

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
  };

  const services = await ServiceModel.find(filters)
    .sort({ [queryObj.sort]: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalServices = await ServiceModel.countDocuments(filters);
  const totalPages = Math.ceil(totalServices / limit);

  if (!services) next(new ErrorHandler('No services found', 404));

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
