const express = require('express')
const router = express.Router()
const axios = require('axios')
const { CityWeather } = require('../models/cityWeather')
const { error } = require('../middlewear/error')
const { getSaved } = require('../middlewear/getSaved')
const logger = require('../startup/logger')

router.get('/', [error, getSaved], async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.URL}lat=${req.query.lat}&lon=${req.query.lon}&exclude=minutely&units=imperial&appid=${process.env.API_KEY}`
    )

    const geo = await axios.get(
      `https://geocode.xyz/${data.lat},${data.lon}?region=US&json=1`
    )

    const currentWeather = {
      icon: data.current.weather[0].icon,
      temp: data.current.temp,
      date: data.current.dt,
      forcast: data.current.weather[0].description,
      wind: {
        windDegree: data.current.wind_deg,
        windSpeed: data.current.wind_speed,
      },
      humidity: data.current.humidity,
      clouds: data.current.clouds,
    }

    const dailyWeather = data.daily.map((current) => {
      return {
        icon: current.weather[0].icon,
        date: current.dt,
        temp: {
          max: current.temp.max,
          min: current.temp.min,
        },
        forecast: current.weather[0].description,
        wind: {
          windDegree: current.wind_deg,
          windSpeed: current.wind_speed,
        },
        humidity: current.humidity,
        clouds: current.clouds,
      }
    })

    const hourlyWeather = {
      data: data.hourly,
    }

    const newCityWeather = new CityWeather({
      lat: data.lat,
      lon: data.lon,
      current: currentWeather,
      daily: dailyWeather,
      hourly: hourlyWeather,
      location: `${geo.data.city}, ${geo.data.state}`,
      alerts: data.alerts,
    })
    const weather = await newCityWeather.save()
    res.send(weather)
  } catch (error) {
    logger.error(error)
    res.status(500).send(error.message)
  }
})

module.exports = router
