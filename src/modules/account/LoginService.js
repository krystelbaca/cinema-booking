const Booker = require('../../models/Booker')

const findAccount = async (email, password) => {
  try {
    const account = await Booker.findOne({ email: email })

    if(!account) {
      console.log(`No account related with email: ${email}`)
      return
    }

    const isPasswordValid = await account.comparePassword(password)

    if(isPasswordValid) {
      console.log('Login Successful')
      return account
    } else {
      console.log('Invalid password')
      return null
    }
  } catch (error) {
    console.log('Account not found')
    return error.message
  }
}

const createAccount = async (data) => {
  try {
    const newAccount = new Booker(data)

    const account = await newAccount.save()

    return account
  } catch (error) {
    return error
  }
}


module.exports = {
  findAccount,
  createAccount
}