const express = require('express')
const router = express.Router()
const StarsController = require('src/controllers/stars')

router.get('/', StarsController.getStars)

module.exports = router