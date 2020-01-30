const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = config.express(express())

app.use('/stars', require('src/routes/stars'))
app.use('/starships', require('src/routes/starships'))
app.use('/signin', require('src/routes/users'))

app.get('/', (req, res) => {
  console.log(mongoose.models);
  let result = '<h1>Main page</h1><h2>There is next categories:</h2>'
  for(let model in mongoose.models) {
    result += `<h3 style="text-transform: capitalize;"><a href="${model}s">${model}s</a></h3>`
  }

  res.send(result)
})

mongoose.connect(config.app.dbUrl, config.app.dbOptions)

mongoose.connection.once('open', () => {
  console.log(`Mongoose - successful connection ...`)

  app.listen(process.env.PORT || config.app.port, () => {
    console.log(`Server started on port ${config.app.port}`);
  })
}).on('error', error => console.warn(error));
