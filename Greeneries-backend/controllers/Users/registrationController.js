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

exports.userRegistration = async (req, res, nex) => {
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

    const roleObject = await Role.findOne({ id: 3 });
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
    res.status(500).json({ message: "Server error" });
  }
};

exports.userVerification = async (req, res, next) => {
  try {
    const { phoneNumber, phoneVerificationCode } = req.body;
    // Fetch user details
    const user = await User.findOne({ phoneNumber });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check OTP expiry
    if (Date.now() > user.otpPhoneCodeExpiration) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (phoneVerificationCode !== user.phoneVerificationCode) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isPhoneVerified = true;
    user.otpPhoneCodeExpiration = null;
    user.phoneVerificationCode = null;
    await user.save();
    res.status(201).json({ message: "User verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// sign In

exports.userSignIn = async (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { phoneNumber, password } = req.body;

    // Find the user by their phone
    const user = await User.findOne({ phoneNumber }).populate("role");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if user is verified
    if (!user.isPhoneVerified) {
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
      // return res.status(400).json({ message: "User not verified" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // User is logged in successfully
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    user.token = token;
    await user.save();
    // Respond with the token and user information
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.status(201).json({ message: "Success", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//reset Password by phoneNumber

exports.getPasswordResetOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist please Sign Up" });
    }

    // Generate OTP and expiry time
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

    // Save user to database with status unverified
    user.otpForgetPassword = otp;
    user.otpExpiryForgetPassword = otpExpiry;
    await user.save();

    // Send OTP for verification
    sendOtp(phoneNumber, otp);

    return res.status(201).json({ message: "Otp Sent to your mobile number" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//verify otp for forget password incomplete for now
exports.verifyOtpPassword = async (req, res, next) => {
  try {
    const { phoneNumber, otpForgetPassword } = req.body;
    const user = await User.findOne({ phoneNumber });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check OTP expiry
    if (Date.now() > user.otpExpiryForgetPassword) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (otpForgetPassword !== user.otpForgetPassword) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otpExpiryForgetPassword = null;
    user.otpForgetPassword = null;
    await user.save();
    res.status(201).json({ message: "verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Reset Password

exports.resetPassword = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Bcrypt the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new password to user's data
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//getting details of users
exports.getuserRegistration = async (req, res) => {
  try {
    const phoneNumber = req.params.num;
    const registration = await User.find({ phoneNumber }).populate("role");
    return res.status(201).json(registration);
    // res.status(201).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
