const { CityWeather } = require("../models/cityWeather");

const getSaved = async (req) => {
  const weather = await CityWeather.findOne({
    "coordinates.lat": `${req.query.lat}`,
    "coordinates.lon": `${req.query.lon}`,
  });

  if (!weather) return "";

  if (compareTimestamp(weather._id.getTimestamp())) return weather;

  await CityWeather.deleteOne({ _id: weather._id });
  return "";
};

function compareTimestamp(timestamp) {
  const isodate = new Date(new Date().toISOString());
  if (isodate.getTime() - timestamp.getTime() < 3000) return true;
}

module.exports.getSaved = getSaved;
