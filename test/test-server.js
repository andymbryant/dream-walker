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

  it('should show HTML', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  }); 
});

// Test for /dashboard
describe('The dashboard page', function() {
  it('should show HTML', function(done) {
    chai.request(server)
      .get('/dashboard')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });  
});

// Test for /dreams
describe('The dreams page', function() {
  it('should show dream entries on GET', function(done) {
    chai.request(server)
      .get('/dreams')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['id', 'title', 'entry', 'type', 'hoursSlept'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
        done();
      });
  }); 

  it('should delete an entry on DELETE', function(done) {
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
});

describe('The new dream page', function() {
  it('should add an item on POST', function(done) {
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