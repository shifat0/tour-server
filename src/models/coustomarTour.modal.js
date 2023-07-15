const mongoose = require("mongoose");

const customTourSchema = new mongoose.Schema(
    {

        email: { type: String, required: true },
        destination: { type: String, required: true },
        additionalDetails: { type: String, required: true },
        mobileNumber: { type: Number, required: true },

        startDates: { type: [Date] },
        maxGroupSize: { type: Number },
        price: { type: Number },
        duration: { type: Number },
        images: [String],
        startLocation: { type: String },
        status: {
            type: String,
            enum: ["checked", "Unchecked"],
            default: "Unchecked",
        },
        createdBy: { type: mongoose.SchemaTypes.ObjectId },
    },
    { timestamps: false, versionKey: false }
);

const CustomerTour = mongoose.model("customTour", customTourSchema);

module.exports = CustomerTour;
