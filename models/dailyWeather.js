const mongoose = require("mongoose");

const DailyWeatherSchema = new mongoose.Schema({
  icon: String,
  temp: Number,
  date: Number,
  data: {
    forecast: String,
    wind: { windDegree: Number, windSpeed: Number },
    humidity: Number,
    sunrise: Number,
    sunset: Number,
  },
});

const DailyWeather = mongoose.model("daily-weather", DailyWeatherSchema);

module.exports.DailyWeather = DailyWeather;
