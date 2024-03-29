const { User } = require("../../models/User.models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { Role } = require("../../models/roles/roles.models");
const jwt = require("jsonwebtoken");
const { sendOtp } = require("../../utils/fileUploads");
const { asyncHandler } = require("../../utils/asyncHandler");
const { ApiError } = require("../../utils/ApiError");
const { ApiResponse } = require("../../utils/ApiResponse");
const { uploadOnCloudinary } = require("../../utils/cloudinary");

//refresh token
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

exports.userRegistration = asyncHandler(async (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    throw new ApiError(400, "Validation Error", errors.array());
  }
  const { userName, phoneNumber, email, password } = req.body;

  if (!userName) {
    return res.json({
      error: "name is required",
    });
  }
  if (!phoneNumber && !email) {
    throw new ApiError(400, "Validation Error", [
      "phonenumber or email is required",
    ]);
  }
  //checking if password is valid
  if (!password || password.length < 6) {
    throw new ApiError(
      400,
      "password is invalid it should be six or more than six digits"
    );
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
        .status(200)
        .json(
          new ApiResponse(
            200,
            { user: existingUser },
            "User not verified OTP sent for verification"
          )
        );
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, "User already exists ,Please Sign In"));
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
  res.status(200).json(new ApiResponse(200, user, "OTP sent for verification"));
});

exports.userVerification = asyncHandler(async (req, res, next) => {
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
    throw new ApiError(400, "User not found");
  }

  // Check OTP expiry
  if (Date.now() > user.otpCodeExpiration) {
    throw new ApiError(400, "OTP expired");
  }

  // Verify OTP
  if (otpVerificationCode !== user.otpVerificationCode) {
    throw new ApiError(400, "Invalid OTP");
  }

  if (email) {
    user.isEmailVerified = true;
  } else if (phoneNumber) {
    user.isPhoneVerified = true;
  }
  user.otpCodeExpiration = null;
  user.otpVerificationCode = null;
  await user.save();
  res
    .status(201)
    .json(new ApiResponse(200, user, "User verified successfully"));
});

// sign In
exports.userSignIn = asyncHandler(async (req, res, nex) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "All fields are required", {
      errors: errors.array(),
    });
  }

  const { phoneNumber, email, password } = req.body;

  // Find the user by their phone or email
  let user;
  if (email) {
    user = await User.findOne({ email }).populate("role");
  } else if (phoneNumber) {
    user = await User.findOne({ phoneNumber }).populate("role");
  }

  if (!user) {
    throw new ApiError(400, "User not found");
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
        new ApiResponse(
          200,
          user,
          "User not verified OTP sent for verification"
        )
      );
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid password");
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
    .json(
      new ApiResponse(
        200,
        { data: userWithoutPassword, token: token },
        "success"
      )
    );
});

//reset Password by phoneNumber
exports.getPasswordResetOtp = asyncHandler(async (req, res, next) => {
  const { phoneNumber, email } = req.body;
  let user;
  if (email) {
    user = await User.findOne({ email }).populate("role");
  } else if (phoneNumber) {
    user = await User.findOne({ phoneNumber }).populate("role");
  }

  if (!user) {
    throw new ApiError(400, "User does not exist please Sign Up");
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

  return res
    .status(201)
    .json(new ApiResponse(200, "Otp Sent to your mobile number"));
});

//verify otp for forget password incomplete for now
exports.verifyOtpPassword = asyncHandler(async (req, res, next) => {
  const { phoneNumber, email, otpVerificationCode } = req.body;
  let user;
  if (email) {
    user = await User.findOne({ email }).populate("role");
  } else if (phoneNumber) {
    user = await User.findOne({ phoneNumber }).populate("role");
  }
  // Check if user exists
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // Check OTP expiry
  if (Date.now() > user.otpCodeExpiration) {
    throw new ApiError(400, "OTP expired");
  }

  // Verify OTP
  if (otpVerificationCode !== user.otpVerificationCode) {
    throw new ApiError(400, "Invalid OTP");
  }

  user.otpCodeExpiration = null;
  user.otpVerificationCode = null;
  await user.save();
  res.status(201).json(new ApiResponse(200, "verified successfully"));
});

//Reset Password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { phoneNumber, email, password } = req.body;
  let user;
  if (email) {
    user = await User.findOne({ email }).populate("role");
  } else if (phoneNumber) {
    user = await User.findOne({ phoneNumber }).populate("role");
  }
  // Check if user exists
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // Bcrypt the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save the new password to user's data
  user.password = hashedPassword;
  await user.save();

  res.status(201).json(new ApiResponse(200, "Password reset successfully"));
});

//getting details of users
exports.getuserRegistration = asyncHandler(async (req, res) => {
  const { identifier } = req.params; // this can be either phoneNumber or email
  let user;
  if (identifier && identifier.includes("@")) {
    user = await User.findOne({ email: identifier }).populate("role");
  } else {
    user = await User.findOne({ phoneNumber: identifier }).populate("role");
  }
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user));
});
