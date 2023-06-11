const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
     iserviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paid: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: String,
      default: false,
    },
    
    isCompleted:{
      type:Boolean,
      default:false
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookingSchema);
