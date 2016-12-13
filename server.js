const express = require('express');
const morgan = require('morgan')
const app = express();
const dreamsRouter = require('./dreamsRouter');
const dashboardRouter = require('./dashboardRouter');
const newDreamRouter = require('./newDreamRouter');

app.use(express.static('public'));
app.use(morgan('common'));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/dashboard', dashboardRouter);

app.use('/dreams', dreamsRouter);

app.use('/new-dream', newDreamRouter);

module.exports = server;