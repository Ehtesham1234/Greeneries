const express = require("express");
const superAdminController = require("../../controllers/Users/superAdminRegistrationController");
const { body } = require("express-validator");
const router = express.Router();
const verifyToken = require("../../middleware/validateToken");

const verifySuperAdmin = verifyToken("superadmin");

router
  .post("/superadmin/signup", superAdminController.userRegistration)
  .post("/superadmin/signin", superAdminController.userSignIn)
  .get(
    "/superadmin/:num",
    verifySuperAdmin,
    superAdminController.getuserRegistration
  );

exports.router = router;
