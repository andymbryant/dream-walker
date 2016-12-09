var express = require('express');
var app = express();
app.use(express.static('public'));
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = server;