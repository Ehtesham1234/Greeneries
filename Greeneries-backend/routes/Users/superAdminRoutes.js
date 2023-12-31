const express = require("express");
const superAdminController = require("../../controllers/Users/superAdminRegistrationController");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../../middleware/validateToken");
// Validation middleware for item creation and update
const validateItem = [
  body("firstName").notEmpty().trim().escape(),
  body("email").notEmpty().trim().escape(),
];
const verifySuperAdmin = verifyToken("superadmin");

router
  .post("/superadmin/signup", superAdminController.userRegistration)
  .post("/superadmin/signin", superAdminController.userSignIn)
  .get("/superadmin/:num", superAdminController.getuserRegistration);

exports.router = router;
