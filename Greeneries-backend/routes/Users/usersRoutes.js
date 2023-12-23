const express = require("express");
const userController = require("../../controllers/Users/registrationController");
const { body } = require("express-validator");
const router = express.Router();

// Validation middleware for item creation and update
const validateItem = [
  body("firstName").notEmpty().trim().escape(),
  body("phoneNumber").notEmpty().trim().escape(),
];

router
  .post("/signUp", userController.userRegistration)
  .post("/verification", userController.userVerification)
  .post("/signIn", userController.userSignIn)
  .post("/forgetPassword", userController.getPasswordResetOtp)
  .post("/forgetPassword/verifyOtp", userController.verifyOtpPassword)
  .post("/forgetPassword/resetPassword", userController.getPasswordResetOtp)
  .get("/:num", userController.getuserRegistration);

exports.router = router;
