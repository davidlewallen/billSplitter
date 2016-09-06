process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server/server');
var knex = require('../../server/db/knex');

chai.use(chaiHttp);

describe('API Group Routes', () => {

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

  describe('GET /api/group/:id', function() {
    it('should return a single group', function(done) {
      chai.request(server)
      .get('/api/group/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('test');
        res.body[0].should.have.property('created_by');
        res.body[0].created_by.should.equal('test1');
        done();
      });
    });
  });

  describe.only('POST /api/group/create', function() {
    it('should create a single group and add the user to it', function(done) {
      chai.request(server)
      .post('/api/group/create')
      .set('content-type', 'application/json')
      .send({ userId: 1, groupName: 'testCreate' })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
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
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(3)
        done();
      })
    })
  })
});