const { createReservation, getMyReservation } = require('../services/BookingService') 

const createBooking = async (req, res) => {
  try {
    const { body, account } = req

    const booking = await createReservation(body, account)

    return res.status(201).json(booking)
  } catch (error) {
    return error.message
  }
}

const getBooking = async (req, res) => {
  const { reservationCode } = req.query
  try {
    const booking = await getMyReservation(reservationCode)

    return res.status(200).json({
      "Reservation Code": booking.reservationCode,
      email: booking.email,
      "Auditorium": booking.auditorium,
      "Time": booking.schedule,
      "Seats": booking.seats.join(','),
    })
  } catch (error) {
    return error.message
  }
}

module.exports = {
  createBooking,
  getBooking
}