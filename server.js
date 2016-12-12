const express = require('express');
const morgan = require('morgan')
const app = express();
const indexRouter = require('./indexRouter');
const dreamsRouter = require('./dreamsRouter');


app.use(express.static('public'));
app.use(morgan('common'));
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/new-dream', (req, res) => {
  res.sendFile(__dirname + '/public/new-dream.html');
});

app.use('/', indexRouter);

app.use('/dreams', dreamsRouter);

app.use('/new-dream', dreamsRouter);

module.exports = server;