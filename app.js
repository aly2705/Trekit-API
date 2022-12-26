const express = require("express");
const morgan = require("morgan");
const tripRouter = require("./routes/tripRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utilities/AppError");

const app = express();

//Dev logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Body parser
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/users", userRouter);

// Route not found!
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);
  next(err);
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
