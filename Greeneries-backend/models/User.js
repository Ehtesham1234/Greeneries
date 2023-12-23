const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new Schema(
  {
    role: { type: ObjectId, ref: "Role" },
    userId: { type: Number },
    firstName: { type: String, trim: true },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String,unique: true, trim: true }, //ager admin login ker rahe to email se hora tub yeh rahne per error der " required: true," 
    password: { type: String, required: true },
    addressOne: { type: String },
    countryId: { type: Number },
    stateCode: { type: String },
    city: { type: String },
    zipCode: { type: String },
    profileImage: { type: String },
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
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

exports.User = mongoose.model("User", UserSchema);
