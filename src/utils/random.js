const { v4: uuidv4 } = require('uuid')

const generateReservationCode = (length = 6) => {
  return uuidv4().replace(/-/g, '').slice(0, length).toUpperCase()
}

module.exports = generateReservationCode
