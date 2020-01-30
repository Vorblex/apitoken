const { User } = require('src/models')
const bCrypt = require('bcrypt-node')
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign({
          userId: user._id.toString(),
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '12h'
        })

        res.json({
          message: "Auth successful",
          token,
          role: user.role
        })
      } else {
        res.status(401).json({message: 'Invalid credentials!'})
      }
    })
    .catch(err => res.status(500).json({message: err.message}))
}

module.exports = {
  signIn
}