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

    res.status(201).json({
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

exports.getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        trip,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        trip,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) throw new Error("No trip found with that id");

    res.status(204).json({
      status: "success",
      data: {
        trip: null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};
