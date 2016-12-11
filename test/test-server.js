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
  it('should show dream entries', function(done) {
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
});