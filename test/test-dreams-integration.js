const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {Dream} = require('../models');
const {User} = require('../users/models')
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedDreamData() {
  console.info('seeding dream entry data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateDreamData());
  }
  // this will return a promise
  return Dream.insertMany(seedData);
}

function generateDreamType() {
  let type = ['Normal Dream', 'Lucid Dream', 'Nightmare', 'Daydream', 'False Awakening'];
  return type[Math.floor(Math.random() * type.length)];
}

function generateHoursSlept() {
  return Math.floor(Math.random() * 10);
}

// generate an object represnting a dream.
// can be used to generate seed data for db
// or request.body data
function generateDreamData() {
  return {
    title: faker.lorem.sentence(),
    entry: faker.lorem.paragraph(),
    type: generateDreamType(),
    hoursSlept: generateHoursSlept()
  }
}

function generateUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.random.word(),
    password: faker.random.alphaNumeric()
  }
}

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  data from one test does not stick
// around for next one
//
// we have this function return a promise because
// mongoose operations are asynchronous. we can either
// call a `done` callback or return a promise in our
// `before`, `beforeEach` etc. functions.
// https://mochajs.org/#asynchronous-hooks
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('Dream Walker API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRestaurantData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer();
  });

  beforeEach(function() {
    return seedDreamData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing dreams in HTML for current user', function() {
      // strategy:
      //    1. get back all dreams returned by GET request to `/dreams/json`
      //    2. prove res has right status, data type
      //    3. prove the number of dreams we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/dreams/all/json')
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
      //    res.should.be.html;
          // otherwise our db seeding didn't work
          //res.body.should.have.length.of.at.least(1);
          //return Dream.count();
        })
        // UNCOMMENT AFTER NEW ENDPOINT IS MADE
        // .then(function(count) {
        //   res.body.should.have.length.of(count);
        // });
    });

/* UNCOMMENT AFTER NEW ENDPOINT IS MADE
    it('should return dreams with right fields', function() {
      // Strategy: Get back all dreams, and ensure they have expected keys

      let resDream;
      return chai.request(app)
        .get('/dreams')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(dream) {
            dream.should.be.a('object');
            dream.should.include.keys(
              'id', 'title', 'entry', 'type', 'hoursSlept');
          });
          resDream = res.body[0];
          return Dream.findById(resDream.id);
        })
        .then(function(dream) {

          resDream.id.should.equal(dream.id);
          resDream.title.should.equal(dream.title);
          resDream.entry.should.equal(dream.entry);
          resDream.type.should.equal(dream.type);
          resDream.hoursSlept.should.equal(dream.hoursSlept)
        });
    }); */
  });

  // describe('POST endpoint', function() {
  //   // strategy: make a POST request with data,
  //   // then prove that the dream we get back has
  //   // right keys, and that `id` is there (which means
  //   // the data was inserted into db)
  //   it('should add a new dream entry', function() {

  //     const newDream = generateDreamData();

  //     return chai.request(app)
  //       .post('/dreams/new')
  //       .send(newDream)
  //       .then(function(res) {
  //         res.should.have.status(201);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.include.keys('id', 'title', 'entry', 'type', 'hoursSlept');
  //         // cause Mongo should have created id on insertion
  //         res.body.id.should.not.be.null;
  //         res.body.title.should.equal(newDream.title);
  //         res.body.entry.should.equal(newDream.entry);
  //         res.body.type.should.equal(newDream.type);
  //         res.body.hoursSlept.should.equal(newDream.hoursSlept);
  //         res.body.created.should.not.be.null;

  //         return Dream.findById(res.body.id);
  //       })
  //       .then(function(dream) {
  //         dream.title.should.equal(newDream.title);
  //         dream.entry.should.equal(newDream.entry);
  //         dream.type.should.equal(newDream.type);
  //         dream.hoursSlept.should.equal(newDream.hoursSlept);
  //       });
  //   });

  //   it('should add a new user', function() {

  //     const newUser = generateUser();

  //     return chai.request(app)
  //       .post('/users')
  //       .send(newUser)
  //       .then(function(res) {
  //         res.should.have.status(201);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.include.keys('firstName', 'lastName', 'username');
  //         // cause Mongo should have created id on insertion
  //         res.body.id.should.not.be.null;
  //         res.body.firstName.should.equal(newUser.firstName);
  //         res.body.lastName.should.equal(newUser.lastName);
  //         res.body.username.should.equal(newUser.username);

  //         return User.findById(res.body.id);
  //       })
  //       .then(function(user) {
  //         user.firstName.should.equal(newUser.firstName);
  //         user.lastName.should.equal(newUser.lastName);
  //         user.username.should.equal(newUser.username);
  //       });
  //   });

  // });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing dream from db
    //  2. Make a PUT request to update that dreamt
    //  3. Prove dream returned by request contains data we sent
    //  4. Prove dream in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        title: 'Sparkling Coffee',
        entry: 'Gibberish, jibberish, jibber-jabber and gobbledygook'
      };

      return Dream
        .findOne()
        .exec()
        .then(function(dream) {
          updateData.id = dream.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/dreams/${dream.id}/json`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(204);

          return Dream.findById(updateData.id).exec();
        })
        .then(function(dream) {
          dream.title.should.equal(updateData.title);
          dream.entry.should.equal(updateData.entry);
        });
      });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a dream
    //  2. make a DELETE request for that dream's id
    //  3. assert that response has right status code
    //  4. prove that dream with the id doesn't exist in db anymore
    it('should delete a dream by id', function() {

      let dream;

      return Dream
        .findOne()
        .exec()
        .then(function(_dream) {
          dream = _dream;
          return chai.request(app).delete(`/dreams/${dream.id}/json`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Dream.findById(dream.id).exec();
        })
        .then(function(_dream) {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_dream.should.be.null` would raise
          // an error. `should.be.null(_dream)` is how we can
          // make assertions about a null value.
          should.not.exist(_dream);
        });
    });
  });
});
