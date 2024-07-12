const mongoose = require('mongoose')

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

const Booker = mongoose.model('Booker', bookerSchema)

module.exports = Booker
