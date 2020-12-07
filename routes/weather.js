const express = require("express");
const Joi = require("joi");
const axios = require("axios");
const { CurrentWeather } = require("../models/currentWeather");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const data = await CurrentWeather.findOne({
    date: req.body.date,
  });

  if (!data) {
    const {
      data: { current },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lon}&units=imperial&appid=cb879b4844206c1fbb59f2d987588976`
    );
    const currentWeather = new CurrentWeather({
      icon: current.weather[0].icon,
      temp: current.temp,
      date: current.dt,
      data: {
        forecast: current.weather[0].description,
        humidity: current.humidity,
        visibility: current.visibility,
        sunrise: current.sunrise,
        sunset: current.sunset,
      },
    });
    currentWeather.save();
    res.send(currentWeather);
    return;
  }
  res.send(data);
});

const schema = Joi.object({
  date: Joi.number(),
  lat: Joi.number().required(),
  lon: Joi.number().required(),
});

module.exports = router;
