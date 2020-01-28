const mongoose = require('mongoose')

const starSchema = mongoose.Schema({
  title: {
      type: String,
      unique: true
  }
});

module.exports = mongoose.model('star', starSchema)