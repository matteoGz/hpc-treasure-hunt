const mongoose = require('mongoose');

const hintSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
      type: String,
      required: true,
      minlength: 20
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number]
      }
    },
    image: String,
    hunt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hunt',
      required: true
    }
});

module.exports = mongoose.model('Hint', hintSchema);