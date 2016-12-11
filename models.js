const uuid = require('uuid');

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

function createDreamEntry() {
  const storage = Object.create(dreams);
  storage.items = {};
  return storage;
}

module.exports = {
  dreams: createDreamEntry()
}