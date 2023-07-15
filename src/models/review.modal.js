const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        tour_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tours'
        },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        tour_title: { type: String },

        review: { type: String }
    },
    { timestamps: false, versionKey: false }


);

module.exports = mongoose.model("review", reviewSchema);
