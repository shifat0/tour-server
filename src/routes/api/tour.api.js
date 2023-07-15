const express = require("express");
const router = express.Router();
const TourControler = require("../../controler/tourControler");

router.post("/create", TourControler.createATour);
router.post("/create/customer-tour", TourControler.createCustomerTour);
router.get("/get-all/customer-tour", TourControler.getAllCustomerTours);
router.delete("/delete", TourControler.deleteATour);
router.get("/all", TourControler.getAllTours);
router.get("/:tourId", TourControler.getATour);
router.put("/update", TourControler.updateATour);

// adding review
router.post("/add-review", TourControler.addReviewToSingleTour);

module.exports = router;
