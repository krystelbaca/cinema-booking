const express = require('express')

const app = express()

const router = require('./Router')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = 3001
const mongoURI = process.env.MONGO_URI

app.use(express.json())

if (!process.env.MONGO_URI) {
  console.error('Error: MongoURI is not defined.')
  process.exit(1)
}

mongoose.connect(mongoURI, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'))
db.once('open', () => {
  console.log('Connected to MongoDB successfully')
})

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Service running at port ${PORT}`)
})

module.exports = app;
