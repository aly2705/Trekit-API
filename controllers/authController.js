const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utilities/catchAsync");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  // Send jwt via cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
      token,
    },
  });
});
