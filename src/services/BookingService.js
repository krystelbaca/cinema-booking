const Booking = require('../models/Booking')
const { selectSeats } = require('./AuditoriumService')

const generateReservationCode = require('../utils/random')

const createReservation = async (booking) => {
  booking.reservationCode = generateReservationCode()
  console.log('BOOKING', booking)
  const {
    auditorium,
    schedule,
    numberOfSeats,
  } = booking

  const selectedSeats = await selectSeats(auditorium, schedule, numberOfSeats)
  booking.seats = selectedSeats
  const reservation = new Booking(booking);

  const createdReservation = await reservation.save();
  return createdReservation;
}

const getMyReservation = async (reservationCode) => {
  console.log('RESERVATION CODE', reservationCode)
  try {
    const reservation = await Booking.findOne({ reservationCode: reservationCode })
    console.log('RESERVATION', reservation)
    return reservation
  } catch (error) {
    return error.message
  }
}

module.exports = {
  createReservation,
  getMyReservation
}