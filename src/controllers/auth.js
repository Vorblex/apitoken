const { User, Token } = require('src/models')
const bCrypt = require('bcrypt-node')
const jwt = require('jsonwebtoken')
const authHelper = require('src/helpers/authHelper')

const updateTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId.toString())
  const refreshToken = authHelper.generateRefreshToken()

  return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.token
    }))
}

const signIn = (req, res) => {
  const {email, password} = req.body

  User.findOne({email})
    .exec()
    .then( user => {

      if(!user) {
        res.status(401).json({message: 'User does not exist!'})
      }

      const isValid = bCrypt.compareSync(password, user.password)
      
      if(isValid) {
        updateTokens(user._id)
          .then(tokens => res.json(tokens))
        // const token = jwt.sign({
        //   userId: user._id.toString(),
        //   role: user.role
        // },
        // process.env.JWT_SECRET,
        // {
        //   expiresIn: '12h'
        // })

        // res.json({
        //   message: "Auth successful",
        //   token,
        //   role: user.role
        // })
      } else {
        res.status(401).json({message: 'Invalid credentials!'})
      }
    })
    .catch(err => res.status(500).json({message: err.message}))
}

const refreshTokens = (req, res) => {
  const { refreshToken } = req.body
  let payload

  try {
    payload = jwt.verify(refreshToken, process.env.JWT_SECRET)

    if(payload.type !== 'refresh') {
      return res.status(400).json({message: 'Invalid token!'})
    }
  } catch(e) {
    if(e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({message: 'Token expired!'})
    } else if(e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({message: 'Invalid token!'})
    }
  }

  Token.findOne({tokenId: payload.id})
    .exec()
    .then((token) => {
      if(token === null) {
        throw new Error('Invalid token!')
      }

      return updateTokens(token.userId)
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({message: err.message}))
}

module.exports = {
  signIn,
  refreshTokens
}