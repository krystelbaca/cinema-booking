const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
  number: Number,
  booked: {
    type: Map,
    of: Boolean,
    default: {
      "3:00 PM": false,
      "5:00 PM": false,
      "7:00 PM": false
    }
  }
})

module.exports = seatSchema