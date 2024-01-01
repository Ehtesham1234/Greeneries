const express = require("express");
const userController = require("../../controllers/Users/registrationController");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../../middleware/validateToken");
const verifyUser = verifyToken("user");
const validateItem = [
  body("firstName").notEmpty().trim().escape(),
  body("phoneNumber").notEmpty().trim().escape(),
];

router
  .post("/signup", userController.userRegistration)
  .post("/verification", userController.userVerification)
  .post("/signin", userController.userSignIn)
  .post("/forgetpassword", verifyUser, userController.getPasswordResetOtp)
  .post(
    "/forgetpassword/verifyotp",
    verifyUser,
    userController.verifyOtpPassword
  )
  .post(
    "/forgetpassword/resetpassword",
    verifyUser,
    userController.getPasswordResetOtp
  )
  .get("/:num", verifyUser, userController.getuserRegistration);

exports.router = router;
