const { db } = require("../database/connection");

exports.addBooking = async (booking) => {
    try {
        const newBooking = await db.Booking.create(booking);
        return newBooking;
    } catch (err) {
        return err;
    }
};

exports.getBookingByEmail = async (email, tourId) => {
    try {
        const booking = await db.Booking.find({ email: email, tour_id: tourId });

        return booking;
    } catch (err) {
        return err;
    }
};
exports.getAllBooking = async () => {
    try {
        const allBooking = await db.Booking.find({});
        return allBooking;
    } catch (err) {
        return err;
    }
};
exports.findBookingById = async (tourId) => {
    try {
        const booking = await db.Booking.find({ tour_id: tourId });
        return booking;
    } catch (err) {
        return err;
    }
};
exports.findBookingByEmail = async (email) => {
    try {
        const booking = await db.Booking.find({ email: email });
        return booking;
    } catch (err) {
        return err;
    }
};
exports.updateTourStatus = async (tourId, data) => {
    try {
        const booking = db.Booking.findByIdAndUpdate(tourId, data);
        return booking;
    } catch (err) {
        return err;
    }
};
