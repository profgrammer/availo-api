const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: Date
});

module.exports = mongoose.model('Coord', coordSchema);
