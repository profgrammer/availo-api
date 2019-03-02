const mongoose = require('mongoose');

const officerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phoneNo: {type: String, required: true},
  address: {type: String, required: true},
  designation: {type: String, required: true},
  department: {type: String, required: true},
  description: {type: String, required: true},
  officeLocation: {
    latitude: Number,
    longitude:
    Number
  },
  status: {type: String, required: true},
  timestamp: Date,
  workingHours: {
    startTime: Date,
    endTime: Date
  },
  phoneExtension: {type: String, required: true},
  PAdetails: {
    email: String,
    password: String
  }
});

module.exports = mongoose.model('Officer', officerSchema);
