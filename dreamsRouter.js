const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Dream } = require('./models');

const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  Dream
    .find()
    .exec()
    .then(dreams => {
      res.json(dreams.map(dream => dream.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});



// Mock Data For Testing //
/*
dreams.create('test title 1', 'lorem ipsum', 'lucid', 8);
dreams.create('test title 2', 'morem jpsum', 'lucid', 8);
dreams.create('test title 3', 'norem kpsum', 'lucid', 8);
*/
/*
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/dreams.html');
});

router.get('/new', (req, res) => {
  res.sendFile(__dirname + '/public/new.html');
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'entry', 'type', 'hoursSlept'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating dream entry \`${req.params.id}\``);
  const updatedItem = dreams.update({
    id: req.params.id,
    title: req.body.title,
    entry: req.body.entry,
    type: req.body.type,
    hoursSlept: req.body.hoursSlept
  });
  res.json(updatedItem);
})

router.delete('/:id', (req, res) => {
  dreams.delete(req.params.id);
  console.log(`Deleted dream entry \`${req.params.id}\``);
  res.status(204).end();
});

/*router.post('/', jsonParser, (req, res) => {
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
});*/



module.exports = router;