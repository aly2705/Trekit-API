// const mongoose = require("mongoose");
const Trip = require("../models/tripModel");

exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.createNewTrip = async (req, res, next) => {
  try {
    const trips = await Trip.create(req.body);

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: {
        trips,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
