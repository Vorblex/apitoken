const mongoose = require('mongoose')

const starshipSchema = mongoose.Schema({
  title: {
      type: String,
      unique: true
  }
});

module.exports = mongoose.model('starship', starshipSchema)