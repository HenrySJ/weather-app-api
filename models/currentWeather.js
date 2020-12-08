const mongoose = require("mongoose");

const CurrentWeatherSchema = new mongoose.Schema({
  icon: String,
  temp: Number,
  date: Number,
  data: {
    forcast: String,
    wind: { windDegree: Number, windSpeed: Number },
    humidity: Number,
    visibility: Number,
    sunrise: Number,
    sunset: Number,
  },
});

const CurrentWeather = mongoose.model("Current-Weather", CurrentWeatherSchema);

module.exports.CurrentWeather = CurrentWeather;
