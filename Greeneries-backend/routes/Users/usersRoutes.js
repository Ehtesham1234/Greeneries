const express = require("express");
const userController = require("../../controllers/Users/registrationController");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../../middleware/validateToken");
// Validation middleware for item creation and update
const validateItem = [
  body("firstName").notEmpty().trim().escape(),
  body("phoneNumber").notEmpty().trim().escape(),
];
const verifyUser = verifyToken("user");

router
  .post("/signup", userController.userRegistration)
  .post("/verification", userController.userVerification)
  .post("/signin", userController.userSignIn)
  .post("/forgetpassword", userController.getPasswordResetOtp)
  .post("/forgetpassword/verifyotp", userController.verifyOtpPassword)
  .post("/forgetpassword/resetpassword", userController.getPasswordResetOtp)
  .get("/:num", userController.getuserRegistration);

exports.router = router;
