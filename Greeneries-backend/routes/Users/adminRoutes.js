const express = require("express");
const adminController = require("../../controllers/Users/adminRegistrationController");
const { body } = require("express-validator");
const router = express.Router();

// Validation middleware for item creation and update
const validateItem = [
  body("firstName").notEmpty().trim().escape(),
  body("email").notEmpty().trim().escape(),
];

router
  .post("/admin/signUp", adminController.userRegistration)
  .post("/admin/signIn", adminController.userSignIn)
  .get("/admin/:num", adminController.getuserRegistration);

exports.router = router;
