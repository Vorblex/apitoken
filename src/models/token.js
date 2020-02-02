const mongoose = require('mongoose')

const toketSchema = mongoose.Schema({
  tokenId: String,
  userId: String
})

module.exports = mongoose.model('token', toketSchema)