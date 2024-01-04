const multer = require("multer");
const fs = require("fs");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio auth token
const client = twilio(accountSid, authToken);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("file.mimetype->", file.mimetype);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      if (!fs.existsSync("./images")) fs.mkdirSync("./images");
      callback(null, "./images");
    } else if (
      file.mimetype === "text/csv" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
      callback(null, "./uploads");
    } else callback(true, "");
  },
  filename: function (req, file, callback) {
    if (file.mimetype === "image/jpg") callback(null, Date.now() + ".jpg");
    else if (file.mimetype === "image/jpeg")
      callback(null, Date.now() + ".jpeg");
    else if (file.mimetype === "image/png") callback(null, Date.now() + ".png");
    else if (
      file.mimetype === "text/csv" ||
      file.mimetype === "application/vnd.ms-excel"
    )
      callback(null, Date.now() + ".csv");
    else callback(true, "");
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});
// File Size Formatter
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

const sendOtp = async (identifier, otp) => {
  console.log("identifier", identifier);
  // Check if identifier is an email
  if (identifier.includes("@")) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // replace with your email provider
      port: 587,
      auth: {
        user: "leonie66@ethereal.email",
        pass: "uTbDvuPfhvkN91k8AW",
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // sender address
      to: identifier, // list of receivers
      subject: "Your OTP", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId, identifier, otp);
  } else {
    // Send SMS
    client.messages
      .create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: identifier,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));
  }
};
module.exports = { upload, fileSizeFormatter, sendOtp };
