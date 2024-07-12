const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
  },
  reservationCode: {
    type: String,
    required: false,
  },
  auditorium: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true
  },
  seats: {
    type: [Number],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },

}, { versionKey: false })

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking