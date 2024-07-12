const Auditorium = require('../models/Auditorium')

const getAuditoriumsAndSchedules = async () => {
  try {
    const auditoriums = await Auditorium.find({}, { name: 1, schedules: 1, seats: 1 }).lean();
    return auditoriums;
  } catch (error) {
    console.error('Error fetching auditoriums and schedules:', error);
    throw error;
  }
}
const checkSeatAvailability = async (requiredSeats) => {
  const auditoriums = await getAuditoriumsAndSchedules()
  return auditoriums.map(auditorium => {
    const schedules = auditorium.schedules.map(schedule => {
      const availableSeats = auditorium.seats.filter(seat => !seat.booked[schedule]).length;
      return {
        schedule,
        availableSeats
      }
    }).filter(schedule => schedule.availableSeats >= requiredSeats)

    return {
      auditorium: auditorium.name,
      schedules
    }
  }).filter(auditorium => auditorium.schedules.length > 0)
}

const selectSeats = async (auditoriumName, schedule, numberOfSeats) => {
  const auditorium = await Auditorium.findOne({ name: auditoriumName });
  if (!auditorium) {
    throw new Error('Auditorium not found');
  }

  const availableSeats = [];
  for (const seat of auditorium.seats) {
    if (!seat.booked.get(schedule)) {
      availableSeats.push(seat.number);
    }
    if (availableSeats.length === numberOfSeats) {
      break;
    }
  }

  if (availableSeats.length < numberOfSeats) {
    throw new Error(`Not enough available seats for ${schedule}`);
  }

  for (const seatNumber of availableSeats) {
    const seat = auditorium.seats.find(seat => seat.number === seatNumber);
    seat.booked.set(schedule, true);
  }

  await auditorium.save();
  return availableSeats;
};





module.exports = {
  checkSeatAvailability,
  selectSeats,
}