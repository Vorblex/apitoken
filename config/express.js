const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

module.exports = (app) => {
  app.use(morgan('combined'))
  app.use(express.json())
  app.use(cors())

  return app
}