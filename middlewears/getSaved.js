const { CityWeather } = require("../models/cityWeather");

const getSaved = (req, res, next) => {
  const weather = CityWeather.findOne({
    coordinates: { lat: req.query.lat, lon: req.query.lon },
  });

  if (!weather) next();

  res.send("we got it");
};

module.exports.getSaved = getSaved;
