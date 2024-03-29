const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const session = require("express-session");
require("dotenv").config();
const { connectDB } = require("./config/dbConnect");
const userRoute = require("./routes/Users/usersRoutes");
const shopRoute = require("./routes/shop/shopRoutes");
const superAdminRoute = require("./routes/Users/superAdminRoutes");
const roleRoute = require("./routes/roles/rolesRoute");
const productRoutes = require("./routes/product/productRoutes");
const { Role } = require("./models/roles/roles.models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ApiError } = require("./utils/ApiError");
connectDB();

const app = express();

const roles = [
  { id: 1, name: "superadmin" },
  { id: 2, name: "admin" },
  { id: 3, name: "user" },
];

Role.countDocuments({})
  .exec()
  .then((count) => {
    if (count === 0) {
      return Role.insertMany(roles);
    } else {
      console.log("Role already exist in database");
    }
  })
  .then(() => {
    console.log("Roles inserted successfully");
  })
  .catch((error) => {
    console.log("error", error);
  });

// Set CORS headers to allow requests from http://127.0.0.1:5173
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Remember to use secure cookies
  })
);

// app.use("/api", require("./routes/api.route"));
app.use("/api", userRoute.router);
app.use("/api", superAdminRoute.router);
app.use("/api", shopRoute.router);
app.use("/api/roles", roleRoute.router);
app.use("/api", productRoutes.router);
//Roles

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      errors: [err],
    });
  }
});

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     status: err.status || 500,
//     message: err.message,
//   });
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
