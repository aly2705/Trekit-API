const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, "A trip must have a city"],
  },
  country: {
    type: String,
    required: [true, "A trip must have a country"],
  },
  image: {
    type: String,
    required: [true, "A trip must be linked to a picture"],
  },
  startDate: {
    type: Date,
    required: [true, "A trip must have a starting date"],
  },
  coords: {
    type: [Number],
    required: [true, "A trip must have a set of coords [lat, lng]"],
  },
  endDate: {
    type: Date,
    required: [true, "A trip must have an ending date"],
    validate: {
      validator: function (input) {
        return new Date(input).getTime() > new Date(this.startDate).getTime();
      },
      message: "Ending date must be after the starting date",
    },
  },
  description: String,
});

// eslint-disable-next-line new-cap
const Trip = new mongoose.model("Trip", tripSchema);

module.exports = Trip;
