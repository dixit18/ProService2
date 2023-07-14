const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const ReviewModel = require("../models/reviewModel.js")
const ServiceModel = require("../models/serviceModel")
const BookingModel = require("../models/bookingModel")

// Create a review
const createReview = catchAsync(async (req, res, next)=>{
    if(req.isServiceProvider) return next(new ErrorHandler("Service Provider Can't Create Review!",403))

    // Check if the user has booked the service and it is completed
    const booking = await BookingModel.findOne({
        serviceId: req.body.serviceId,
        buyerId: req.user._id,
        status: { $in: ["completed"] },
      });
    
    if (!booking) {
        return next(new ErrorHandler("You must book the service to review.", 403));
    }
    
    // Create a new review
    const newReview = new ReviewModel({
        userId:req.user._id,
        serviceId:req.body.serviceId,
        desc:req.body.desc,
        star:req.body.star
    })

    // Check if the user has already created a review for the service
    const review = await ReviewModel.findOne({
        serviceId:req.body.serviceId,
        userId:req.user._id
    })

    if(review) return next(new ErrorHandler("You have already created a review.",403))

    // Save the review
    const savedReview = await newReview.save()
   
    // Update the service's star rating
    await ServiceModel.findByIdAndUpdate(req.body.serviceId,{
        $inc: {totalStars:req.body.star, starNumber:1}
    })

    res.status(201).json({
        savedReview
    })
})

// Get reviews for a service
const getReviews = catchAsync(async (req, res, next)=>{
    const reviews = await ReviewModel.find({serviceId:req.params.id})

    res.status(200).json({
        reviews
    })
})



module.exports = {
    createReview,
    getReviews,
    
}
