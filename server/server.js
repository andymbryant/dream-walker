const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose.js');
const { Dream } = require('./models/dream');
const { User } = require('./models/user');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.post('/dreams', (req, res) => {
  const dream = new Dream({
    text: req.body.text
  });

  dream.save().then((dream) => {
    res.send(dream);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/', (req, res) => {
  res.send('herro world');
});

app.listen(port, () => {
  console.log(`The magic happens on port ${port}`);
});
