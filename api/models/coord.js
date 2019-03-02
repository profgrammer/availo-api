const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
  officerId: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: Date
});

module.exports = mongoose.model('Coord', coordSchema);
