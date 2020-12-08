const mongoose = require("mongoose");

module.exports = () => {
  // Db
  mongoose.connect("mongodb://localhost/weather-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to db");
  });
};
