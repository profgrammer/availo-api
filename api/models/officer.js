const mongoose = require('mongoose');

const officerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  designation: String,
  department: String,
  officeLocation: {
    latitude: Number,
    longitude: Number
  },
  status: String,
  timestamp: Date,
  workingHours: {
    startTime: Date,
    endTime: Date
  },
  phoneExtension: String
});

module.exports = mongoose.model('Officer', officerSchema);
