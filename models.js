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
  },
  user_id: String
});

dreamSchema.virtual('dateFormat').get(function() {
  if ((`${this.created.day}` < 10) && (`${this.created.month}` < 10)) {
    return `0${this.created.month}.0${this.created.day}.${this.created.year}`.trim();
  }
  else if ((`${this.created.day}` < 10) && (`${this.created.month}` > 10)) {
    return `${this.created.month}.0${this.created.day}.${this.created.year}`.trim();
  }
  else if ((`${this.created.month}` < 10) && (`${this.created.day}` > 10)) {
    return `0${this.created.month}.${this.created.day}.${this.created.year}`.trim();
  }
  else {
    return `${this.created.month}.${this.created.day}.${this.created.year}`.trim();
  }
});


dreamSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    type: this.type,
    hoursSlept: this.hoursSlept,
    created: this.dateFormat,
    user_id: this.user_id
  };
}

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {Dream};