const Booking = require('../models/Booking')
const Booker = require('../models/Booker')
const { selectSeats } = require('./AuditoriumService')

const generateReservationCode = require('../utils/random')

const createReservation = async (bookingData, account) => {
  const {
    auditorium,
    schedule,
    numberOfSeats,
  } = bookingData

  const { id, email } = account

  try {
    const selectedSeats = await selectSeats(auditorium, schedule, numberOfSeats)

    const reservationCode = generateReservationCode()

    const booking = new Booking({
      ...bookingData,
      reservationCode,
      seats: selectedSeats,
      email: email,
    })

    const createdReservation = await booking.save()

    await Booker.findByIdAndUpdate(id, {
      $push: { bookings: createdReservation._id },
    })

    return createdReservation
  } catch (error) {
    return error.message
  }
}

const getMyReservation = async (reservationCode) => {
  try {
    const reservation = await Booking.findOne({
      reservationCode: reservationCode 
    })

    return reservation
  } catch (error) {
    console.error('Error in getMyReservation:', error.message)
    throw error;
  }
};

module.exports = {
  createReservation,
  getMyReservation
}