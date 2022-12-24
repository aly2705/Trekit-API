const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Handling uncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down... ❌❌❌❌");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

// Make dotenv variables available on process.env
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Compute Database String
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connect to db using mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

// Handling uncaughtExceptions

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down... ❌❌❌❌");
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
