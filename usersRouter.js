const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {users} = require('./models');

// Mock Data For Testing //
users.create('username1', 'password1');
users.create('username2', 'password2');



// Placeholder until I get real IDs
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/users.html');
});

// These are for when I have IDs in a database
router.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/public/users.html');
});

router.delete('/:id', (req, res) => {
  dreams.delete(req.params.id);
  console.log(`Deleted user \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router;