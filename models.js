const mongoose = require('mongoose');

const dreamSchema = mongoose.Schema({
  title: {type: String, required: true},
  entry: {type: String, required: true},
  type: {type: String, required: true},
  hoursSlept: {type: Number, required: true},
  created: {type: Date, default: Date.now}
});

dreamSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    type: this.type,
    hoursSlept: this.hoursSlept,
    created: this.created
  };
}

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {Dream};
