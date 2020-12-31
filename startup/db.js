const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  // Db
  mongoose.connect(`${process.env.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to db");
  });
};
