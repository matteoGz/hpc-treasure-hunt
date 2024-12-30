const mongoose = require('mongoose');
const { generateRandomCode } = require('../utils/util');

const huntSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'deleted'],
    default: 'active'
  },
  partecipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
});

huntSchema.pre('save', async function(next) {
  if(!this.code)
    this.code = generateRandomCode();
  next();
});

module.exports = mongoose.model('Hunt', huntSchema);