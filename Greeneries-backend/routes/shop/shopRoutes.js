const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const shopController = require("../../controllers/Shop/shopController");
const verifyToken = require("../../middleware/validateToken");
const verifyAdmin = verifyToken("admin");

router.post("/shop/signup", shopController.shopRegister);
router.post("/shop/signin", shopController.shopSignIn);
router.get("/shops", shopController.getShops);
router.post("/shop/profile", shopController.createOrEditProfile);

exports.router = router;
