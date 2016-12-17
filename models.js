const mongoose = require('mongoose');

const dreamSchema = mongoose.Schema({
  title: {type: String, required: true},
  entry: {type: String},
  type: {type: String},
  hoursSlept: {type: Number},
  created: {type: Date, default: Date.now}
});

dreamSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    type: this.type,
    created: this.created
  };
}

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {Dream};
