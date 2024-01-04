const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema(
  {
    role: { type: ObjectId, ref: "Role" },
    shop: { type: ObjectId, ref: "Shop" },
    buyer: { type: ObjectId, ref: "Buyer" },
    userName: { type: String },
    email: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    password: { type: String, required: true },
    phoneVerificationCode: { type: String, default: null },
    otpPhoneCodeExpiration: {
      type: Date,
      default: null,
    },
    isPhoneVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Number, default: 1 },
    otpForgetPassword: { type: String, default: null },
    otpExpiryForgetPassword: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
