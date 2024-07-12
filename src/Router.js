const express = require('express')

const router = express.Router()

const { getAvailableSeats } = require('./controllers/AuditoriumController')

const { createBooking, getBooking } = require('./controllers/BookingController')

// getAvailability by seats
router.get('/cinema', getAvailableSeats)

router.post('/cinema/book', createBooking), 

router.get('/cinema/booking', getBooking)

module.exports = router