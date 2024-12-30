const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  url: {
    type: String
  },
  hint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hint',
    required: true
  }
});

module.exports = mongoose.model('QRCode', qrCodeSchema);