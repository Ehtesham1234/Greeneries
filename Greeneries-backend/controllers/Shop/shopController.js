const { Shop } = require("../../models/Shop");
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
    const { userName, phoneNumber, password } = req.body;

    if (!userName) {
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
      userName,
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
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.shopSignIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find the user by their phone
    const user = await User.findOne({ email }).populate("role");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // User is logged in successfully
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    await user.save();

    // Create a new object with only the properties you want to send
    let userWithoutPassword = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      userId: user.userId,
      role: user.role,
      isActive: user.isActive,
    };

    // Respond with the token and user information
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ message: "Success", data: userWithoutPassword });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
exports.createOrEditProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const shopDetails = req.body;
    const token = req.cookies.token;
    const shoptoken = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(shoptoken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use 'findOneAndUpdate' with 'upsert' option
    let shop = await Shop.findOneAndUpdate(
      { _id: user.shop },
      { $set: shopDetails },
      { new: true, upsert: true }
    );

    // Update the 'shop' field in the User document if a new shop was created
    if (!user.shop) {
      user.shop = shop._id;
      await user.save();
    }

    res.json(shop);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
