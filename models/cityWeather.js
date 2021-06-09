const mongoose = require('mongoose')

const CityWeatherSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  current: Object,
  daily: Array,
  hourly: Array,
  location: String,
  alerts: Array,
})

const CityWeather = mongoose.model('city-weather', CityWeatherSchema)

module.exports.CityWeather = CityWeather
module.exports.CityWeatherSchema = CityWeatherSchema
