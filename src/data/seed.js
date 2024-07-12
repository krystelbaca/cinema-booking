const mongoose = require('mongoose')

require('dotenv').config()

const Auditorium = require('../models/Auditorium')

const mongoURI = process.env.MONGO_URI

const auditoriums = [
  { name: 'A', capacity: 20, schedules: ["3:00 PM", "5:00 PM", "7:00 PM"] },
  { name: 'B', capacity: 20, schedules: ["3:00 PM", "5:00 PM", "7:00 PM"] },
  { name: 'C', capacity: 30, schedules: ["3:00 PM", "5:00 PM", "7:00 PM"] },
]

const createSeats = (capacity) => {
  const seats = []
  for (let i = 1; i <= capacity; i++) {
    seats.push({ number: i, booked: { "3:00 PM": false, "5:00 PM": false, "7:00 PM": false } })
  }
  return seats
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')

    await Auditorium.deleteMany({})
    console.log('Existing data cleared')

    const auditoriumPromises = auditoriums.map(aud => {
      const seats = createSeats(aud.capacity)
      const auditorium = new Auditorium({ ...aud, seats })

      return auditorium.save().then(savedAuditorium => {
        console.log(`Auditorium ${savedAuditorium.name} created with ${savedAuditorium.seats.length} seats`)
      }).catch(err => {
        console.error(`Error saving auditorium ${aud.name}:`, err)
      })
    })

    await Promise.all(auditoriumPromises)

    console.log('Database seeded successfully')
    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.disconnect()
  }
}

seedDatabase()
