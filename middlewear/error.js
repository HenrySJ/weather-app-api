const Joi = require('joi')

const schema = Joi.object({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
})

const error = (req, res, next) => {
  const { error } = schema.validate({
    lat: req.query.lat,
    lon: req.query.lon,
  })
  if (error) return res.status(400).send(error.details[0].message)
  next()
}

module.exports.error = error
