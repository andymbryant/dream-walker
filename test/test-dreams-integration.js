const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const { Dream } = require('../models');
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for title and entry
// and then we insert that data into mongo
function seedDreamData() {
  console.info('seeding dream data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateDreamData());
  }
  // this will return a promise
  return Dream.insertMany(seedData);
}

function generateDreamTitle() {
  let dreamTitle = faker.lorem.sentence();
  return dreamTitle;
}

function generateDreamEntry() {
  let dreamEntry = faker.lorem.paragraph();
  return dreamEntry;
}

function generateDreamType() {
  const types = [
    'Normal Dream', 'Lucid Dream', 'Nightmare', 'Day Dream', 'False Awakening'];
  return types[Math.floor(Math.random() * types.length)];
}

function generateHoursSlept() {
  const hours = [Math.floor(Math.random() * 10)];
  return hours
}

function generateDate() {
  let postDate = faker.date.recent();
  return postDate;
}

// generate an object representing a dream.
// can be used to generate seed data for db
// or request.body data
function generateBlogPostData() {
  return {
    title: generateDreamTitle(),
    entry: generateDreamEntry(),
    type: generateDreamType(),
    hoursSlept: generateHoursSlept(),
    date: generateDate()
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
  })

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {

    it('should return all existing dreams', function() {
      // strategy:
      //    1. get back all dreams returned by GET request to `/dreams`
      //    2. prove res has right status, data type
      //    3. prove the number of dreams we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/dreams')
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.length.of.at.least(1);
          return Dream.count();
        })
        .then(function(count) {
          res.body.should.have.length.of(count);
        });
    });


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
              'id', 'title', 'entry', 'type', 'hoursSlept', 'date');
          });
          resDream = res.body[0];
          return Dream.findById(resDream.id);
        })
        .then(function(dream) {

          resDream.id.should.equal(dream.id);
          resDream.title.should.equal(dream.title);
          resDream.entry.should.equal(dream.entry);
          resDream.type.should.equal(dream.type);
          resDream.hoursSlept.should.equal(dream.hoursSlept);
          resDream.date.should.equal(dream.date);
        });
    });
  });
/*
  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the blog post we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new blog post', function() {

      const newPost = generateBlogPostData();

      return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('id', 'author', 'content', 'title', 'created');
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.author.should.equal(`${newPost.author.firstName} ${newPost.author.lastName}`);
          res.body.content.should.equal(newPost.content);
          res.body.title.should.equal(newPost.title);
          res.body.created.should.not.be.null;

          return BlogPost.findById(res.body.id);
        })
        .then(function(post) {
          post.content.should.equal(newPost.content);
          post.title.should.equal(newPost.title);
          post.author.firstName.should.equal(newPost.author.firstName);
          post.author.lastName.should.equal(newPost.author.lastName);
        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing post from db
    //  2. Make a PUT request to update that post
    //  3. Prove post returned by request contains data we sent
    //  4. Prove post in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        title: 'Sparkling Coffee',
        content: 'Gibberish, jibberish, jibber-jabber and gobbledygook'
      };

      return BlogPost 
        .findOne()
        .exec()
        .then(function(post) {
          updateData.id = post.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/posts/${post.id}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(204);

          return BlogPost.findById(updateData.id).exec();
        })
        .then(function(post) {
          post.title.should.equal(updateData.title);
          post.content.should.equal(updateData.content);
        });
      });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a post
    //  2. make a DELETE request for that post's id
    //  3. assert that response has right status code
    //  4. prove that post with the id doesn't exist in db anymore
    it('delete a post by id', function() {

      let post;

      return BlogPost
        .findOne()
        .exec()
        .then(function(_post) {
          post = _post;
          return chai.request(app).delete(`/posts/${post.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return BlogPost.findById(post.id).exec();
        })
        .then(function(_post) {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_post.should.be.null` would raise
          // an error. `should.be.null(_post)` is how we can
          // make assertions about a null value.
          should.not.exist(_post);
        });
    });
  }); */
});









/*const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

let server;

beforeEach(function() {
  server = require('../server');
});

afterEach(function() {
  server.close();
});

// Tests for root URL
describe('The root URL', function() {
  it('should display HTML on GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }); 
});

// Test for /users/:id
describe('The /users/:id/dashboard page', function() {

  it('should display HTML on GET', function(done) {
    chai.request(server)
      .get('/users/:id/dashboard')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }); 

  it('should delete a user on DELETE', function(done) {
    chai.request(server)
      // first have to get so we have an `id` of item
      // to delete
      .get('/users')
      .end(function(err, res) {
        chai.request(server)
          .delete(`/users/${res.body[0].id}`)
          .end(function(err, res) {
            res.should.have.status(204);
          });
          done();
      });
  });

});

// Test for /dreams
describe('The /dreams page', function() {
  it('should display HTML on GET', function(done) {
    chai.request(server)
      .get('/dreams')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }); 

  it('should delete a dream entry on DELETE', function(done) {
    chai.request(server)
      // first have to get so we have an `id` of item
      // to delete
      .get('/dreams')
      .end(function(err, res) {
        chai.request(server)
          .delete(`/dreams/${res.body[0].id}`)
          .end(function(err, res) {
            res.should.have.status(204);
          });
          done();
      });
  });

  it('should update a dream entry on PUT', function(done) {
    chai.request(server)
      .get('/dreams')
      .end(function(err, res) {
        const updated = {
          id: res.body[0].id,
          title: 'Updated Title',
          entry: 'Updated dream entry',
          type: 'lucid',
          hoursSlept: 8
        };
        chai.request(server)
          .put(`/dreams/${res.body[0].id}`)
          .send(updated)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.deep.equal(updated);
            done();
          });
      });
  }); 
});

// test for /new-dream page
describe('The /dreams/new page', function() {
  it('should display HTML on GET', function(done) {
    chai.request(server)
      .get('/dreams/new')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  /*
  it('should add a dream entry on POST', function(done) {
    const newItem = {title: 'Please Work', entry: 'I REALLY HOPE THIS WORKS', type: 'lucid', hoursSlept: 7};
    chai.request(server)
      .post('/new-dream')
      .send(newItem)
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('title', 'entry', 'type', 'hoursSlept');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
        done();
      });
  }); 

});
*/