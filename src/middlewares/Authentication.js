const jwt = require('../utils/jwt')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

 if(!authHeader) {
  return res.status(401).json({ error: 'You must log in your account to create a booking' })
 }

 const token = authHeader.split(' ')[1];
 if (!token) {
   return res.status(401).json({ error: 'Unauthorized: Malformed token' })
 }

 try {
  const isTokenVerified = jwt.validateToken(token)

  req.account = isTokenVerified
  next()
 } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
 }
}

module.exports = auth;