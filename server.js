const dotenv = require("dotenv");
const mongoose = require("mongoose");

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
