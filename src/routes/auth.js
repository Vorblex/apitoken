const express = require('express')
const router = express.Router()
const AuthController = require('src/controllers/auth')

router.post('/', AuthController.signIn)

router.post('/refresh-tokens', AuthController.refreshTokens)

module.exports = router