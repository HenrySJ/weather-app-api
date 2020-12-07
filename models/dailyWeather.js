const { number } = require("joi");
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
