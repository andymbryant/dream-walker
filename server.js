const express = require('express');
const morgan = require('morgan')
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/dreams', (req, res) => {
  res.sendFile(__dirname + '/public/dreams.html');
});

module.exports = server;