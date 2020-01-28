const express = require('express')
const router = express.Router()
const { Starship } = require('src/models')

router.get('/', (req, res) => {

  Starship.find({}, (err, data) => {
    const result = data.map(el => {
      return `<h3>${el.title}</h3>`
    })
 
    res.send('<h1>Starships page</h1>' + result.join(''))
  })
})

router.get('/new/:title', (req, res) => {
  const star = new Starship({title: req.params.title})
  star.save((err, data) => {
    console.log(data);
    res.send(data)
  })
 })

 module.exports = router