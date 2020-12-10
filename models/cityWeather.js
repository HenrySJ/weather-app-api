const mongoose = require("mongoose");
const { CurrentWeatherSchema } = require("./currentWeather");
const { DailyWeatherSchema } = require("./dailyWeather");
const { HourlyWeatherSchema } = require("./hourlyWeather");

const CityWeatherSchema = new mongoose.Schema({
  coordinates: {
    lat: Number,
    lon: Number,
  },
  current: CurrentWeatherSchema,
  daily: DailyWeatherSchema,
  hourly: HourlyWeatherSchema,
  location: String,
  alerts: Array,
});

const CityWeather = mongoose.model("city-weather", CityWeatherSchema);

module.exports.CityWeather = CityWeather;
module.exports.CityWeatherSchema = CityWeatherSchema;
