const express = require("express");
const tripController = require("../controllers/tripController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, tripController.getAllTrips)
  .post(authController.protect, tripController.createNewTrip);

router
  .route("/:id")
  .get(authController.protect, tripController.getTripById)
  .patch(authController.protect, tripController.updateTrip)
  .delete(authController.protect, tripController.deleteTrip);

module.exports = router;
