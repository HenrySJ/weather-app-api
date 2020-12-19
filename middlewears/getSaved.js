const { CityWeather } = require("../models/cityWeather");

const getSaved = async (req, res, next) => {
  const weather = await CityWeather.findOne({
    "coordinates.lat": `${req.query.lat}`,
    "coordinates.lon": `${req.query.lon}`,
  });

  if (!weather) return next();

  res.send(weather);
};

module.exports.getSaved = getSaved;
