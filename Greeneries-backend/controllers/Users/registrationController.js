const { User } = require("../../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { Role } = require("../../models/roles/roles");
const jwt = require("jsonwebtoken");
const { sendOtp } = require("../../utils/fileUploads");

exports.userRegistration = async (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userName, phoneNumber, email, password } = req.body;

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
    let existingUser;
    if (email) {
      existingUser = await User.findOne({ email });
    } else if (phoneNumber) {
      existingUser = await User.findOne({ phoneNumber });
    }
    if (existingUser) {
      if (
        (email && !existingUser.isEmailVerified) ||
        (phoneNumber && !existingUser.isPhoneVerified)
      ) {
        // Generate OTP and expiry time
        const otp = crypto.randomBytes(3).toString("hex");
        const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

        // Save user to database with status unverified
        existingUser.otpVerificationCode = otp;
        existingUser.otpCodeExpiration = otpExpiry;

        if (email) {
          existingUser.isEmailVerified = false;
        } else if (phoneNumber) {
          existingUser.isPhoneVerified = false;
        }

        await existingUser.save();

        // Send OTP for verification
        sendOtp(phoneNumber || email, otp);

        return res
          .status(201)
          .json(
            { message: "User not verified OTP sent for verification" },
            "User",
            existingUser
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
      email,
      password: hashedPassword,
      role: roleObject._id,
      otpVerificationCode: otp,
      otpCodeExpiration: otpExpiry,
    });

    if (email) {
      user.isEmailVerified = false;
    } else if (phoneNumber) {
      user.isPhoneVerified = false;
    }
    await user.save();

    // Send OTP for verification
    sendOtp(phoneNumber || email, otp);

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
    const { phoneNumber, email, otpVerificationCode } = req.body;
    // Fetch user details
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check OTP expiry
    if (Date.now() > user.otpCodeExpiration) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (otpVerificationCode !== user.otpVerificationCode) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (email) {
      user.isEmailVerified = true;
    } else if (phoneNumber) {
      user.isPhoneVerified = true;
    }
    user.otpCodeExpiration = null;
    user.otpVerificationCode = null;
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
    const { phoneNumber, email, password } = req.body;

    // Find the user by their phone or email
    let user;
    if (email) {
      user = await User.findOne({ email }).populate("role");
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber }).populate("role");
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if user is verified
    if (
      (email && !user.isEmailVerified) ||
      (phoneNumber && !user.isPhoneVerified)
    ) {
      // Generate OTP and expiry time
      const otp = crypto.randomBytes(3).toString("hex");
      const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

      // Save user to database with status unverified
      user.otpVerificationCode = otp;
      user.otpCodeExpiration = otpExpiry;
      if (email) {
        user.isEmailVerified = false;
      } else if (phoneNumber) {
        user.isPhoneVerified = false;
      }
      await user.save();

      // Send OTP for verification
      sendOtp(phoneNumber || email, otp);

      return res
        .status(201)
        .json(
          { message: "User not verified OTP sent for verification" },
          "User",
          user
        );
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

    let userWithoutPassword = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
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
      .json({ message: "Success", data: userWithoutPassword, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//reset Password by phoneNumber
exports.getPasswordResetOtp = async (req, res, next) => {
  try {
    const { phoneNumber, email } = req.body;
    let user;
    if (email) {
      user = await User.findOne({ email }).populate("role");
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber }).populate("role");
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist please Sign Up" });
    }

    // Generate OTP and expiry time
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes

    // Save user to database with status unverified
    user.otpVerificationCode = otp;
    user.otpCodeExpiration = otpExpiry;
    await user.save();

    // Send OTP for verification
    sendOtp(phoneNumber || email, otp);

    return res.status(201).json({ message: "Otp Sent to your mobile number" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//verify otp for forget password incomplete for now
exports.verifyOtpPassword = async (req, res, next) => {
  try {
    const { phoneNumber, email, otpVerificationCode } = req.body;
    let user;
    if (email) {
      user = await User.findOne({ email }).populate("role");
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber }).populate("role");
    }
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check OTP expiry
    if (Date.now() > user.otpCodeExpiration) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Verify OTP
    if (otpVerificationCode !== user.otpVerificationCode) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otpCodeExpiration = null;
    user.otpVerificationCode = null;
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
    const { phoneNumber, email, password } = req.body;
    let user;
    if (email) {
      user = await User.findOne({ email }).populate("role");
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber }).populate("role");
    }
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
    const { identifier } = req.params; // this can be either phoneNumber or email
    let user;
    if (identifier && identifier.includes("@")) {
      user = await User.findOne({ email: identifier }).populate("role");
    } else {
      user = await User.findOne({ phoneNumber: identifier }).populate("role");
    }
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
