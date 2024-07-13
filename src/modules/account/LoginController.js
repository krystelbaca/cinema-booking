const { findAccount, createAccount } = require('./LoginService')
const { generateToken } = require('../../utils/jwt')

const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const account = await findAccount(email, password)

    if(!account) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = generateToken(account)
    return res.status(200).json({ message: 'Login successful', account, token })
  } catch(error) {
    return error.message
  }
}

const AddAccount = async (req, res, next) => {
  try {
    const { body } = req

    const response = await createAccount(body)
    return res.status(201).json(response)
  } catch (error) {
    return error.message
  }
}

module.exports = {
  loginAccount,
  AddAccount
}