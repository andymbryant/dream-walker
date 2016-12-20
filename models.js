const mongoose = require('mongoose');

const dreamSchema = mongoose.Schema({
  title: {type: String, required: true},
  entry: {type: String, required: true},
  type: {type: String, required: true},
  hoursSlept: {type: Number, required: true},
  created: {
    month: Number,
    day: Number,
    year: Number
  }
});

dreamSchema.virtual('dateFormat').get(function() {
  return `${this.created.month}.${this.created.day}.${this.created.year}`.trim();
});

dreamSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    type: this.type,
    hoursSlept: this.hoursSlept,
    created: this.dateFormat
  };
}

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {Dream};