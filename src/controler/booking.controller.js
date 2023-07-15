const bookingService = require("../service/bookingService.js");
const { OK, ERROR } = require("../utils/responseHelper.js");
const UserService = require("../service/userService.js");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.paymentTour = async (req, res) => {
    const { booking } = req.body;
    const price = (booking && booking.price) ? ((booking.price / 90).toFixed(2) * 100) : 100;

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while creating the PaymentIntent.' });
    }
};


exports.bookingTour = async (req, res) => {
    try {
        const { payload } = req.body;

        const existTour = await bookingService.getBookingByEmail(payload.email, payload.tour_id);

        if (existTour.length > 0) {
            return ERROR(res, [], "You Already booked this tour");
        }
        const bookingData = await bookingService.addBooking(payload);
        return OK(res, bookingData, "Booking successfully");
    } catch (err) {
        ERROR(res, [], "Error while booking tour");
    }
};

exports.updateTourStatus = async (req, res) => {
    try {
        const { email, tourId, data } = req.body;

        const user = await UserService.getUserByEmail(email);
        if (!user.length) return ERROR(res, [], "User not found");

        const bookingData = await bookingService.findBookingById(tourId);

        if (!bookingData) return ERROR(res, [], "booking not found");

        const result = await bookingService.updateTourStatus(tourId, data);

        // if (result.message) return ERROR(res, [], result.message);

        return OK(res, result, "Booking updated successfully");

    } catch (err) {
        ERROR(res, [], "Error while booking tour");
    }
};
exports.getBookingByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const bookingData = await bookingService.findBookingByEmail(email);
        if (!bookingData) return ERROR(res, [], "booking not found");

        return OK(res, bookingData, "Get  booking by email ");

    } catch (err) {
        ERROR(res, [], "Error while get booking tour");
    }
};
exports.getAllBookingTour = async (req, res) => {
    try {
        const allBookingTour = await bookingService.getAllBooking();

        return OK(res, allBookingTour, "Get all booking tour");

    } catch (err) {
        ERROR(res, [], "Error while get booking tour");
    }
};