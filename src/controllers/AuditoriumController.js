const { checkSeatAvailability } = require('../services/AuditoriumService')

const getAvailableSeats = async (req, res) => {
  try {
    const { seats } = req.query;

    const availableSeats = await checkSeatAvailability(parseInt(seats));

    return res.status(200).json(availableSeats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAvailableSeats
}