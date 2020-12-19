const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");
const { CityWeather } = require("../models/cityWeather");
const Joi = require("joi");
const { CurrentWeather } = require("../models/currentWeather");
const { DailyWeather } = require("../models/dailyWeather");
const { HourlyWeather } = require("../models/hourlyWeather");
const { getSaved } = require("../middlewear/getSaved");

const schema = Joi.object({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
});

router.get("/", getSaved, async (req, res) => {
  const { error } = schema.validate({
    lat: req.query.lat,
    lon: req.query.lon,
  });

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { data } = await axios.get(
      `${config.get("URL")}lat=${req.query.lat}&lon=${
        req.query.lon
      }&units=imperial&appid=${config.get("API_KEY")}`
    );

    const geo = await axios.get(
      `https://geocode.xyz/${data.lat},${data.lon}?region=US&json=1`
    );

    const newCurrentWeather = new CurrentWeather({
      icon: data.current.weather[0].icon,
      temp: data.current.temp,
      date: data.current.dt,
      data: {
        forcast: data.current.weather[0].forcast,
        wind: {
          windDegree: data.current.wind_deg,
          windSpeed: data.current.wind_speed,
        },
        humidity: data.current.humidity,
        visibility: data.current.visibility,
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
      },
    });

    const dailyArray = data.daily.map((current) => {
      return {
        icon: current.weather[0].icon,
        temp: current.temp.max,
        date: current.dt,
        data: {
          forecast: current.weather[0].description,
          wind: {
            windDegree: current.wind_deg,
            windSpeed: current.wind_speed,
          },
          humidity: current.humidity,
          sunrise: current.sunrise,
          sunset: current.sunset,
        },
      };
    });
    const newDailyWeather = new DailyWeather({
      data: dailyArray,
    });

    const newHourlyWeahter = new HourlyWeather({
      data: data.hourly,
    });

    const newCityWeather = new CityWeather({
      coordinates: {
        lat: data.lat,
        lon: data.lon,
      },
      current: newCurrentWeather,
      daily: newDailyWeather,
      hourly: newHourlyWeahter,
      location: `${geo.data.city}, ${geo.data.state}`,
      alerts: data.alerts,
    });
    const weather = await newCityWeather.save();
    res.send(weather);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
