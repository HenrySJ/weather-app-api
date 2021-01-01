const mongoose = require("mongoose");

const CurrentWeatherSchema = new mongoose.Schema({
  icon: String,
  temp: Number,
  date: Date,
  data: {
    forcast: String,
    wind: { windDegree: Number, windSpeed: Number },
    humidity: Number,
    visibility: Number,
    sunrise: Date,
    sunset: Date,
  },
});

const CurrentWeather = mongoose.model("Current-Weather", CurrentWeatherSchema);

module.exports.CurrentWeather = CurrentWeather;
module.exports.CurrentWeatherSchema = CurrentWeatherSchema;
