const express = require('express')
const router = express.Router()
const axios = require('axios')
const Joi = require('joi')
const { CityWeather } = require('../models/cityWeather')
const { getSaved } = require('../middlewear/getSaved')
const logger = require('../startup/logger')

const schema = Joi.object({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
})

router.get('/', async (req, res) => {
  const { error } = schema.validate({
    lat: req.query.lat,
    lon: req.query.lon,
  })

  if (error) return res.status(400).send(error.details[0].message)

  const result = await getSaved(req)
  if (result) return res.send(result)

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
