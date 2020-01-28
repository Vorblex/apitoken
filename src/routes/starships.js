const express = require('express')
const router = express.Router()
const StarshipsController = require('src/controllers/starships')

router.get('/', StarshipsController.getStarships)

router.get('/new/:title', StarshipsController.newStarship)

module.exports = router