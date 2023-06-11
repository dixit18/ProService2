const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 1,
    },
    starNumber: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      // required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
