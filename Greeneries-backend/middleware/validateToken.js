const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

// Middleware for verifying token
exports.verifyToken = (role) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.userId)
      .populate("role")
      .exec((err, user) => {
        if (err || !user || user.role.name !== role)
          return res.status(401).send("Invalid role");
        req.user = decoded;
        next();
      });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
