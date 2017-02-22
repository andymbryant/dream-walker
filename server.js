const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const dreamsRouter = require('./dreamsRouter');
const {router: usersRouter} = require('./users');

const {DATABASE_URL, PORT} = require('./config');
const {Dream} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ secret: 'dreamwalker' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.Promise = global.Promise;

app.get('/logout', function (req, res){
  req.logout();
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/dashboard',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(__dirname + '/public/dashboard.html');
  }
);

app.get('/dreams',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(__dirname + '/public/dreams.html');
  }
);

app.get('/dreams/new',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(__dirname + '/public/new-dream.html');
  }
);


app.use('/users/', usersRouter);

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