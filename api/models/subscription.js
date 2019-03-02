const mongoose = require('mongoose');

const subSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  endpoint: String,
  keys: {
    auth: String,
    p256dh: String
  }
});

module.exports = mongoose.model('Sub', subSchema);
