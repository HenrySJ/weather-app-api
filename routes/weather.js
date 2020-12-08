const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");
const { CityWeather } = require("../models/cityWeather");

router.get("/", async (req, res) => {
  const coord = {
    lat: req.query.lat,
    lon: req.query.lon,
  };

  try {
    const { data } = await axios.get(
      `${config.get("p")}lat=${coord.lat}&lon=${
        coord.lon
      }&units=imperial&appid=${config.get("API_KEY")}`
    );
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
