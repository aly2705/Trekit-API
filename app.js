const express = require("express");
const morgan = require("morgan");
const tripRouter = require("./routes/tripRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//Dev logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Body parser
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/trips", tripRouter);

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
