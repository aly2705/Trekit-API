const express = require("express");
const morgan = require("morgan");
const tripRouter = require("./routes/tripRoutes");

const app = express();

//Dev logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Body parser
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/trips", tripRouter);

module.exports = app;
