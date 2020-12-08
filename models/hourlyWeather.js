const mongoose = require("mongoose");

const HourlyWeatherSchema = new mongoose.Schema({
  data: Array,
});

const HourlyWeather = mongoose.model("hourly-weather", HourlyWeatherSchema);

module.exports.HourlyWeather = HourlyWeather;
module.exports.HourlyWeatherSchema = HourlyWeatherSchema;
