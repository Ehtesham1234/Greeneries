const mongoose = require("mongoose");

exports.connectDB = async () => {
  mongoose.connect(process.env.Mongo_Db__url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
