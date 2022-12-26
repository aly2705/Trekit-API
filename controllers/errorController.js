const AppError = require("../utilities/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/).at(0);
  const message = `Duplicate field value: ${value}. Please use another value`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((value) => value.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = "Invalid token! Please log in again";
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = "Token has expired! Please log in again";
  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational error or programming error (different responses)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR 📛📛📛📛:", err);

    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  // If not already AppError with statusCode, set default
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle errors for development
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // Handling operational errors in production
    let error = Object.create(err); //error with same prototype

    // Invalid data queried = CastError
    if (error.name === "CastError") error = handleCastErrorDB(error);

    // Duplicate fields = error.code is 11000
    if (error.code === 11000) error = handleDuplicateErrorDB(error);

    // Validate errors = ValidationError
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    // Invalid JWT = JsonWebTokenError
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);

    // Expired JWT = TokenExpiredError
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};
