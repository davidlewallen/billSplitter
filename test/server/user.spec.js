process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server/server');
var knex = require('../../server/db/knex');

chai.use(chaiHttp);

describe('API User Routes', () => {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /api/user/google/:googleId', function() {
    it('should return a single user', function(done) {
      chai.request(server)
      .get('/api/user/google/100190799640047046019')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('google_id');
        res.body[0].google_id.should.equal('100190799640047046019');
        res.body[0].should.have.property('first_name');
        res.body[0].first_name.should.equal('David');
        res.body[0].should.have.property('last_name');
        res.body[0].last_name.should.equal('Lewallen');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('lewallen.david@gmail.com');
        done();
      });
    });
  });

  describe('GET /api/user/:id', function() {
    it('should return a single user', function(done) {
      chai.request(server)
      .get('/api/user/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('google_id');
        res.body[0].google_id.should.equal('100190799640047046019');
        res.body[0].should.have.property('first_name');
        res.body[0].first_name.should.equal('David');
        res.body[0].should.have.property('last_name');
        res.body[0].last_name.should.equal('Lewallen');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('lewallen.david@gmail.com');
        done();
      });
    });
  });

  describe('GET /api/user/email/:userEmail', function() {
    it('should return a single user', function(done) {
      chai.request(server)
      .get('/api/user/email/lewallen.david@gmail.com')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('google_id');
        res.body[0].google_id.should.equal('100190799640047046019');
        res.body[0].should.have.property('first_name');
        res.body[0].first_name.should.equal('David');
        res.body[0].should.have.property('last_name');
        res.body[0].last_name.should.equal('Lewallen');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('lewallen.david@gmail.com');
        done();
      });
    });
  });

  describe('GET /api/user/group/:groupId', function() {
    it('should return a single user', function(done) {
      chai.request(server)
      .get('/api/user/group/2')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(2);
        res.body[0].should.have.property('google_id');
        res.body[0].google_id.should.equal('1234');
        res.body[0].should.have.property('first_name');
        res.body[0].first_name.should.equal('testName');
        res.body[0].should.have.property('last_name');
        res.body[0].last_name.should.equal('nameTest');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('test@gmail.com');
        done();
      });
    });
  });

  describe('PUT /api/user/setGroup/:groupId', function() {
    it('should assign a user to a group', function(done) {
      chai.request(server)
      .put('/api/user/setGroup/1')
      .set('content-type', 'application/json')
      .send({ userId: 1 })
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('google_id');
        res.body[0].google_id.should.equal('100190799640047046019');
        res.body[0].should.have.property('first_name');
        res.body[0].first_name.should.equal('David');
        res.body[0].should.have.property('last_name');
        res.body[0].last_name.should.equal('Lewallen');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('lewallen.david@gmail.com');
        done();
      })
    })
  })

})