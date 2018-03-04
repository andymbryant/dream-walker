const mongoose = require('mongoose');

const Dream = mongoose.model('Dream', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lucid: {
    type: Boolean,
    default: false
  },
  dreamDate: {
    type: Number,
    default: null
  }
});

module.exports = { Dream };
