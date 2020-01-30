const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String
})

module.exports = mongoose.model('user', userSchema)