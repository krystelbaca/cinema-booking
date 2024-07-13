const express = require('express')

const router = express.Router()

const auth = require('./middlewares/Authentication')

const { getAvailableSeats } = require('./controllers/AuditoriumController')

const { createBooking, getBooking } = require('./controllers/BookingController')

const { loginAccount, AddAccount } = require('./modules/account/LoginController')

router.get('/cinema', getAvailableSeats)

router.post('/cinema/login', loginAccount)

router.post('/cinema/book', auth, createBooking)

router.get('/cinema/booking', getBooking)

router.post('/cinema/create-account', AddAccount)

module.exports = router