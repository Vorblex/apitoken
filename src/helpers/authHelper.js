const { Token } = require('src/models')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const { access, refresh } = require('config/app').tokens

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: access.type
  }

  const options = { expiresIn: access.expiresIn }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: refresh.type
  }

  const options = { expiresIn: refresh.expiresIn }

  return {
    id: payload.id,
    token: jwt.sign(payload, process.env.JWT_SECRET, options)
  }
}

const replaceDbRefreshToken = (tokenId, userId) => {
  return Token.findOneAndRemove({ userId })
          .exec()
          .then(() => Token.create({ tokenId, userId }))
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken
}