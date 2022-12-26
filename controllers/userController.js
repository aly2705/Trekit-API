const User = require("../models/userModel");
const AppError = require("../utilities/AppError");
const catchAsync = require("../utilities/catchAsync");

exports.getUserData = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1) Not allow updating passwords
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("This route is not for updating passwords", 403));

  // 2) Filter body to update only allowed fields (name, email, gender)
  const filteredObj = {};
  if (req.body.name) filteredObj.name = req.body.name;
  if (req.body.email) filteredObj.email = req.body.email;
  if (req.body.gender) filteredObj.gender = req.body.gender;

  // 3) Update user
  const user = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
  });
});
