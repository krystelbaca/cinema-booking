const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const env = process.env.NODE_ENV || 'local'
dotenv.config({ path: `.env.${env}` })
const secretKey = process.env.JWT_SECRET_KEY

const generateToken = (account) => {
  const payload = { 
    id: account._id,
    email: account.email 
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey)

    return decoded
  } catch (error) {
    throw new Error('Invalid token', error)
  }
}

module.exports = {
  generateToken,
  validateToken
}