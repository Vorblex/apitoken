const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('config')

// const { Starship } = require('src/models')

const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.use('/stars', require('./routes/stars'))
app.use('/starships', require('./routes/starships'))

app.get('/', (req, res) => {
  console.log(mongoose.models);
  let result = '<h1>Main page</h1><h2>There is next categories:</h2>'
  for(let model in mongoose.models) {
    result += `<h3 style="text-transform: capitalize;">${model}s</h3>`
  }

  res.send(result)
})

mongoose.connect(config.dbUrl, config.dbOptions)

mongoose.connection.once('open', () => {
  console.log(`Mongoose - successful connection ...`)

  app.listen(process.env.PORT || config.port, () => {
    console.log(`Server started on port ${config.port}`);
  })
}).on('error', error => console.warn(error));
