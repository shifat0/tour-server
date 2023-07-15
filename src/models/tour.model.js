const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    ratingsAverage: { type: Number },
    imageCover: { type: String },
    images: [String],
    startDates: { type: [Date], required: true },
    startLocation: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

const Tour = mongoose.model("tour", tourSchema);

module.exports = Tour;
