const mongoose = require('mongoose')
const seatSchema = require('./Seat')

const auditoriumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  seats: [seatSchema],
  schedules: {
    type: [String],
    required: true,
  }
}, { versionKey: false, collection: 'auditorium' })

const Auditorium = mongoose.model('Auditorium', auditoriumSchema)

module.exports = Auditorium
