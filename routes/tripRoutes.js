const express = require("express");
const tripController = require("../controllers/tripController");

const router = express.Router();

router
  .route("/")
  .get(tripController.getAllTrips)
  .post(tripController.createNewTrip);

router
  .route("/:id")
  .get(tripController.getTripById)
  .patch(tripController.updateTrip)
  .delete(tripController.deleteTrip);

module.exports = router;
