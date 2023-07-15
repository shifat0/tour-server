const { ERROR, OK } = require("../utils/responseHelper");
const TourService = require("../service/tourService");
const UserService = require("../service/userService");

exports.createATour = async (req, res) => {
  try {
    const { email, tourBody } = req.body;
    // console.log(email, tourBody);
    const user = await UserService.getUserByEmail(email);
    if (!user.length) return ERROR(res, [], "User not found");

    if (user[0]?.role !== "admin")
      return ERROR(res, [], "You are not authorized to create a tour");

    const tour = await TourService.createANewTour(tourBody);
    if (tour.message) return ERROR(res, [], tour.message);
    return OK(res, tour, "Tour created successfully");
  } catch (err) {
    return ERROR(res, [], "Error while creating a tour");
  }
};

exports.createCustomerTour = async (req, res) => {
  try {
    const { email, tourPlan } = req.body;
    // console.log(email, tourPlan);
    const user = await UserService.getUserByEmail(email);
    if (!user.length) return ERROR(res, [], "User not found");

    const tour = await TourService.createCustomTour(tourPlan);
    if (tour.message) return ERROR(res, [], tour.message);
    return OK(res, tour, "Tour created successfully");
  } catch (err) {
    return ERROR(res, [], "Error while creating a tour");
  }
};

exports.getAllCustomerTours = async (req, res) => {
  try {
    const tours = await TourService.getAllCustomerTours();
    return OK(res, tours, "All tours");
  } catch (err) {
    return ERROR(res, [], "Error while getting all tours");
  }
};
exports.getAllTours = async (req, res) => {
  try {
    const tours = await TourService.getAllTours();
    return OK(res, tours, "All tours");
  } catch (err) {
    return ERROR(res, [], "Error while getting all tours");
  }
};

exports.getATour = async (req, res) => {
  try {
    const { tourId } = req.params;
    const tour = await TourService.findTourById(tourId);
    if (!tour) return ERROR(res, [], "Tour not found");
    return OK(res, tour, "Tour found");
  } catch (err) {
    return ERROR(res, [], "Error while getting a tour");
  }
};

exports.deleteATour = async (req, res) => {
  try {
    const { email, tourId } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user.length) return ERROR(res, [], "User not found");

    if (user[0]?.role !== "admin")
      return ERROR(res, [], "You are not authorized to delete a tour");

    const tour = await TourService.findTourById(tourId);
    if (!tour) return ERROR(res, [], "Tour not found");

    const result = await TourService.deleteATour(tourId);

    if (result.message) return ERROR(res, [], tour.message);
    return OK(res, result, "Tour deleted successfully");
  } catch (err) {
    return ERROR(res, [], "Error while deleting a tour");
  }
};

exports.updateATour = async (req, res) => {
  try {
    const { email, tourId, tourBody } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user.length) return ERROR(res, [], "User not found");

    if (user[0]?.role !== "admin")
      return ERROR(res, [], "You are not authorized to update a tour");

    const tour = await TourService.findTourById(tourId);
    if (!tour) return ERROR(res, [], "Tour not found");

    const result = await TourService.updateATour(tourId, tourBody);

    if (result.message) return ERROR(res, [], tour.message);
    return OK(res, result, "Tour updated successfully");
  } catch (err) {
    return ERROR(res, [], "Error while updating a tour");
  }
};



// post a review
exports.addReviewToSingleTour = async (req, res) => {
  try {
    const { tourId, ratting } = req.body;
    const tour = await TourService.findTourById(tourId);
    if (!tour) return ERROR(res, [], "Tour not found");

    return OK(res, tour, "Tour found");
  } catch (err) {
    return ERROR(res, [], "Error while getting a tour");
  }
};