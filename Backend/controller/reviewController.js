const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const ReviewModel = require("../models/reviewModel.js")
const ServiceModel = require("../models/serviceModel")
const BookingModel = require("../models/bookingModel")

const createReview = catchAsync(async (req, res, next)=>{
    if(req.isServiceProvider) return next(new ErrorHandler("Service Provider Can't Create Review!",403))

    const booking = await BookingModel.findOne({
        serviceId: req.body.serviceId,
        buyerId: req.user._id,
        status: { $in: ["completed"] },
      });
    
      if (!booking) {
        return next(new ErrorHandler("You must book the service to review.", 403));
      }
    
    const newReview = new ReviewModel({
        userId:req.user._id,
        serviceId:req.body.serviceId,
        desc:req.body.desc,
        star:req.body.star
    })

    const review = await ReviewModel.findOne({
        serviceId:req.body.serviceId,
        userId:req.user._id
    })

    if(review) return next(new ErrorHandler("you have alredy created a reviw",403))

    const savedReview = await newReview.save()
   

    await ServiceModel.findByIdAndUpdate(req.body.serviceId,{
        $inc: {totalStars:req.body.star, starNumber:1}
    })

    res.status(201).json({
        savedReview
    })
})

const getReviews = catchAsync(async (req, res, next)=>{
    const reviews = await ReviewModel.find({serviceId:req.params.id})

    res.status(200).json({
        reviews
    })
})

const deleteReview = catchAsync(async (req, res, next)=>{

})

module.exports = {
    createReview,
    getReviews,
    deleteReview,
}
