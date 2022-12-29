// const mongoose = require("mongoose");
const catchAsync = require("../utilities/catchAsync");
const Trip = require("../models/tripModel");
const AppError = require("../utilities/AppError");

exports.getAllTrips = catchAsync(async (req, res, next) => {
  const trips = await Trip.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: trips.length,
    data: {
      trips,
    },
  });
});

exports.createNewTrip = catchAsync(async (req, res, next) => {
  const tripObj = { ...req.body, user: req.user._id };
  const trip = await Trip.create(tripObj);

  res.status(201).json({
    status: "success",
    data: {
      trip,
    },
  });
});

exports.getTripById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const trip = await Trip.findById(id);

  if (!trip) return next(new AppError("No data found with that id", 404));

  if (trip.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You cannot access trips created by other users", 403)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      trip,
    },
  });
});

exports.updateTrip = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
    return next(new AppError("Start date must be before end date", 400));
  }
  const trip = await Trip.findById(id);
  if (
    (req.body.startDate &&
      !req.body.endDate &&
      new Date(req.body.startDate) > new Date(trip.endDate)) ||
    (!req.body.startDate &&
      req.body.endDate &&
      new Date(trip.startDate) > new Date(req.body.endDate))
  ) {
    return next(new AppError("Start date must be before end date", 400));
  }

  if (!trip) return next(new AppError("No data found with that id", 404));

  if (trip.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You cannot update trips created by other users", 403)
    );
  }

  const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedTrip,
    },
  });
});

exports.deleteTrip = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const trip = await Trip.findById(id);

  if (!trip) return next(new AppError("No data found with that id", 404));

  if (trip.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You cannot delete trips created by other users", 403)
    );
  }

  await Trip.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
  });
});
