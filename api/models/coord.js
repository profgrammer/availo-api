const mongoose = require('mongoose');

const coordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  officerId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Officer'}],
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: Date
});

module.exports = mongoose.model('Coord', coordSchema);
