// const mongoose = require("mongoose");
const catchAsync = require("../utilities/catchAsync");
const Trip = require("../models/tripModel");
const AppError = require("../utilities/AppError");

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const trips = await Trip.find();

  res.status(200).json({
    status: "success",
    results: trips.length,
    data: {
      trips,
    },
  });
});

exports.createNewTrip = catchAsync(async (req, res, next) => {
  const trips = await Trip.create(req.body);

  res.status(201).json({
    status: "success",
    results: trips.length,
    data: {
      trips,
    },
  });
});

exports.getTripById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const trip = await Trip.findById(id);

  if (!trip) return next(new AppError("No data found with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      trip,
    },
  });
});

exports.updateTrip = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const trip = await Trip.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!trip) return next(new AppError("No data found with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      trip,
    },
  });
});

exports.deleteTrip = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const trip = await Trip.findByIdAndDelete(id);

  if (!trip) return next(new AppError("No data found with that id", 404));

  res.status(204).json({
    status: "success",
    data: {
      trip: null,
    },
  });
});
