const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const shopController = require("../../controllers/Shop/shopController");

router.post("/shps/registeration", shopController.shopRegister);

router.get("/shops", shopController.getShops);

exports.router = router;
