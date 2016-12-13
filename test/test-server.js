const chai = require('chai');
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
/*
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
  }); */
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
  }); */

});