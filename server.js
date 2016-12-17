const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { DATABASE_URL, PORT } = require('./config');
const { Dream } = require('./models'); 

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.get('/dreams', (req, res) => {
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




/*
const dreamsRouter = require('./dreamsRouter');
const usersRouter = require('./usersRouter');



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/users', usersRouter);

app.use('/dreams', dreamsRouter);


app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
*/