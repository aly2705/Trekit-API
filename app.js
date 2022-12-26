const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const tripRouter = require("./routes/tripRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utilities/AppError");

const app = express();

//Dev logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//////////////////////////////////////////////////////////////////////
// SECURITY MIDDLEWARE

// 1) Security HTTP Headers
app.use(helmet());

// 2) Rate limiting - limit requests from the same IP Address, 100req/hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

// 3) Body parser and payload limit
app.use(express.json({ limit: "10kb" }));

// 4) Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 5) Data sanitization against XSS (Cross site scripting attacks)
app.use(xss());

// 6) Prevent parameter pollution
app.use(hpp());

////////////////////////////////////////////////////////////////////////
// MOUNTING ROUTERS & GENERAL MIDDLEWARE

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
