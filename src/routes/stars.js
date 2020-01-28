const express = require('express')
const router = express.Router()
const { Star } = require('src/models')

router.get('/', (req, res) => {

  Star.find({}, (err, data) => {
    const result = data.map(el => {
      return `<h3>${el.title}</h3>`
    })
 
    res.send('<h1>Stars page</h1>' + result.join(''))
  })
})

 module.exports = router