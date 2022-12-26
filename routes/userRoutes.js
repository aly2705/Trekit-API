const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router
  .route("/updatePassword")
  .post(authController.protect, authController.updatePassword);

router
  .route("/")
  .get(authController.protect, userController.getUserData)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
