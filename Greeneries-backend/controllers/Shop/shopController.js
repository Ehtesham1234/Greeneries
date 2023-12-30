const Shop = require("../../models/Shop");
const NodeGeocoder = require("node-geocoder");
const { User } = require("../../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const twilio = require("twilio");
const { validationResult } = require("express-validator");
const { Role } = require("../../models/roles/roles");
const jwt = require("jsonwebtoken");

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio auth token
const client = twilio(accountSid, authToken);

function sendOtp(phoneNumber, otp) {
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.error(err));
}

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

exports.getShops = async (req, res) => {
  const userLocation = req.query.location;
  const geoResponse = await geocoder.geocode(userLocation);
  const { latitude, longitude } = geoResponse[0];

  const shops = await Shop.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
    },
  });

  res.json(shops);
};

exports.shopRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, phoneNumber, password } = req.body;

    if (!firstName) {
      return res.json({
        error: "name is required",
      });
    }
    //checking if password is valid
    if (!password || password.length < 6) {
      return res.json({
        error: "password is invalid it should be six or more than six digits",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      if (!existingUser.isPhoneVerified) {
        // Generate OTP and expiry time
        const otp = crypto.randomBytes(3).toString("hex");
        const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

        // Save user to database with status unverified
        user.phoneVerificationCode = otp;
        user.isPhoneVerified = false;
        user.otpPhoneCodeExpiration = otpExpiry;
        await user.save();

        // Send OTP for verification
        sendOtp(phoneNumber, otp);

        return res
          .status(201)
          .json(
            { message: "User not verified OTP sent for verification" },
            "User",
            user
          );
      } else {
        return res
          .status(201)
          .json({ message: "User already exists ,Please Sign In" });
      }
    }

    const roleObject = await Role.findOne({ id: 2 });
    console.log("roleObject", roleObject);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP and expiry time
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

    // Save user to database with status unverified
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      phoneVerificationCode: otp,
      otpPhoneCodeExpiration: otpExpiry,
      isPhoneVerified: false,
      userId: 1,
      role: roleObject._id,
    });
    await user.save();

    // Send OTP for verification
    sendOtp(phoneNumber, otp);

    res
      .status(201)
      .json({ message: "OTP sent for verification" }, "User", user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
