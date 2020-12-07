const express = require("express");
const mongoose = require("mongoose");
const weather = require("./routes/weather");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/weather", weather);

mongoose.connect("mongodb://localhost/weather-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to db");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
