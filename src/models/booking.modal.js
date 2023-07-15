const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        name: { type: String },
        mobile: { type: Number },
        email: { type: String, required: true },
        tour_title: { type: String, required: true },
        price: { type: Number },
        payment: {
            type: String,
            enum: ["pending", "done"],
            default: "pending"
        },
        transaction: { type: String },
        status: {
            type: String,
            enum: ["pending", "confirm"],
            default: "pending"
        },
        tour_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tours'
        },
    },
    { timestamps: false, versionKey: false }


);

module.exports = mongoose.model("booking", bookingSchema);
