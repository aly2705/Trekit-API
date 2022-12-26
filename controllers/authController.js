const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/AppError");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRES,
  });

const createSendToken = (
  user,
  res,
  successStatusCode,
  sendUserBack = false
) => {
  const token = signToken(user._id);

  // Send jwt via cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  user.active = undefined;

  const resObject = {
    status: "success",
    token,
  };

  if (sendUserBack) resObject.user = user;

  res.status(successStatusCode).json(resObject);
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, res, 201, true);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check if email and password exists on req.body
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Email is invalid!", 404));
  }

  const passwordIsCorrect = await user.correctPassword(password, user.password);

  if (!passwordIsCorrect)
    return next(new AppError("Wrong password! Please try again!", 401));

  // 3) If everything ok, send JWT
  createSendToken(user, res, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and see if it exists
  if (
    !req.headers.authorization ||
    !req.headers.authorization.includes("Bearer ")
  )
    return next(
      new AppError(
        "You need to be logged in in order to perform this action!",
        401
      )
    );

  const token = req.headers.authorization.split(" ").at(1);

  // 2) Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SEC);

  // 3) Check if user stil exists
  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError(
        "The user with the provided token does not exist anymore",
        401
      )
    );

  // 4) Check if user changed password after token was issued
  const wasChangedAfterTokenIssue = user.changedPasswordAfter(decoded.iat);
  if (wasChangedAfterTokenIssue)
    return next(
      new AppError(
        "User has changed password after token was issued! Please log in again!",
        401
      )
    );

  // 5) Grant access to protected route
  req.user = user;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const currentUser = await User.findById(user._id).select("+password");

  const isCorrect = await user.correctPassword(
    oldPassword,
    currentUser.password
  );
  if (!isCorrect)
    return next(new AppError("Incorrect password! Please try again!", 403));

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  createSendToken(user, res, 200);
});
