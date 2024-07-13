const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const bookerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' 
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
}, { versionKey: false })

bookerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error);
  }
})

bookerSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const Booker = mongoose.model('Booker', bookerSchema)

module.exports = Booker
