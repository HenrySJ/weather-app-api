const { CityWeather } = require('../models/cityWeather')

const getSaved = async (req, res, next) => {
  const weather = await CityWeather.findOne({
    lat: `${req.query.lat}`,
    lon: `${req.query.lon}`,
  })

  if (weather) {
    if (compareTimestamp(weather._id.getTimestamp())) {
      return res.send(weather)
    }
    await CityWeather.deleteOne({ _id: weather._id })
    return next()
  }
  next()
}

function compareTimestamp(timestamp) {
  return new Date().getTime() - timestamp.getTime() < 300000
}

module.exports.getSaved = getSaved
