const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {dreams} = require('./models');

dreams.create('test title 1', 'lorem ipsum', 'lucid', 8);
dreams.create('test title 2', 'morem jpsum', 'lucid', 8);
dreams.create('test title 3', 'norem kpsum', 'lucid', 8);

router.get('/', (req, res) => {
  res.json(dreams.get());
});

router.delete('/:id', (req, res) => {
  dreams.delete(req.params.id);
  console.log(`Deleted dream entry \`${req.params.id}\``);
  res.status(204).end();
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'entry', 'type', 'hoursSlept'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = dreams.create(req.body.title, req.body.entry, req.body.type, req.body.hoursSlept);
  res.status(201).json(item);
});

module.exports = router;