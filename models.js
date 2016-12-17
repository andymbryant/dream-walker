const mongoose = require('mongoose');

const dreamSchema = mongoose.Schema({
  title: {type: String, required: true},
  entry: {type: String, required: true},
  type: {type: String, required: true},
  hoursSlept: {type: Number, required: true},
  date: {type: Date, default: Date.now}
});

dreamSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    type: this.type,
    hoursSlept: this.hoursSlept,
    date: this.date
  };
}

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = {Dream};



/*const uuid = require('uuid');

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const dreams = {
  create: function(title, entry, type, hoursSlept) {
    console.log('Creating a new dream entry...');
    const item = {
      id: uuid.v4(),
      title: title,
      entry: entry,
      type: type,
      hoursSlept: hoursSlept
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving dream entries...');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting dream entry \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Updating dream entry \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};
*/
/* Work in progress */
/*
const users = {
  create: function(username, password) {
    console.log('Creating a new user...');
    const item = {
      id: uuid.v4(),
      username: username,
      password: password
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving all users...');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting user \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Updating user \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update user \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createDreamEntry() {
  const storage = Object.create(dreams);
  storage.items = {};
  return storage;
}

function createUser() {
  const storage = Object.create(dreams);
  storage.items = {};
  return storage;
}

module.exports = {
  dreams: createDreamEntry(),
  users: createUser()
}
*/