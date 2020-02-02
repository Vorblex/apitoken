const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if(!authHeader) {
    return res.status(401).json({message: 'Token not provided!'})
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if(payload.type !== 'access') {
      return res.status(401).json({message: 'Invalid token!'})
    }
  } catch(e) {
    if(e instanceof jwt.TokenExpiredError) {
      res.status(401).json({message: 'Token expired!'})
    } 
    if(e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({message: 'Invalid token!'})
    }
  }

  next()
}