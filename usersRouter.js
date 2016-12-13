const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {users} = require('./models');

// Mock Data For Testing //
users.create('username1', 'password1');
users.create('username2', 'password2');



// Testing with mock data //
router.get('/', (req, res) => {
  res.json(users.get());
});
// =========================================== //

router.get('/:id/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/users.html');
});

router.delete('/:id', (req, res) => {
  users.delete(req.params.id);
  console.log(`Deleted user \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router;