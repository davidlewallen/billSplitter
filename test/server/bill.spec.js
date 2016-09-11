process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server/server');
var knex = require('../../server/db/knex');

chai.use(chaiHttp);

describe('API Bill Routes', () => {

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

  describe('GET /api/bill', function() {
    it('should return an array of all bills', function(done) {
      chai.request(server)
      .get('/api/bill')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.length.should.equal(2);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('company_name');
        res.body[0].company_name.should.equal('testCompany');
        res.body[0].should.have.property('due_date');
        res.body[0].due_date.should.equal('2016-09-09T05:00:00.000Z');
        res.body[0].should.have.property('amount_total');
        res.body[0].amount_total.should.equal('157.32');
        res.body[0].should.have.property('amount_remaining');
        res.body[0].amount_remaining.should.equal('157.32');
        res.body[0].should.have.property('amount_per_person');
        res.body[0].amount_per_person.should.equal('78.66');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(1);
        res.body[1].should.have.property('id');
        res.body[1].id.should.equal(2);
        res.body[1].should.have.property('company_name');
        res.body[1].company_name.should.equal('testCompany1');
        res.body[1].should.have.property('due_date');
        res.body[1].due_date.should.equal('2016-09-10T05:00:00.000Z');
        res.body[1].should.have.property('amount_total');
        res.body[1].amount_total.should.equal('200.00');
        res.body[1].should.have.property('amount_remaining');
        res.body[1].amount_remaining.should.equal('100.00');
        res.body[1].should.have.property('amount_per_person');
        res.body[1].amount_per_person.should.equal('100.00');
        res.body[1].should.have.property('user_id');
        res.body[1].user_id.should.equal(5);
        res.body[1].should.have.property('group_id');
        res.body[1].group_id.should.equal(1);
        done();
      });
    });
  });

  describe('GET /api/bill/:billId', function() {
    it('should return a single bill', function(done) {
      chai.request(server)
      .get('/api/bill/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('company_name');
        res.body[0].company_name.should.equal('testCompany');
        res.body[0].should.have.property('due_date');
        res.body[0].due_date.should.equal('2016-09-09T05:00:00.000Z');
        res.body[0].should.have.property('amount_total');
        res.body[0].amount_total.should.equal('157.32');
        res.body[0].should.have.property('amount_remaining');
        res.body[0].amount_remaining.should.equal('157.32');
        res.body[0].should.have.property('amount_per_person');
        res.body[0].amount_per_person.should.equal('78.66');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(1);
        done();
      });
    });
  });

  describe('GET /api/bill/group/:groupId', function() {
    it('should return an array of bills associated with a group id', function(done) {
      chai.request(server)
      .get('/api/bill/group/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('company_name');
        res.body[0].company_name.should.equal('testCompany');
        res.body[0].should.have.property('due_date');
        res.body[0].due_date.should.equal('2016-09-09T05:00:00.000Z');
        res.body[0].should.have.property('amount_total');
        res.body[0].amount_total.should.equal('157.32');
        res.body[0].should.have.property('amount_remaining');
        res.body[0].amount_remaining.should.equal('157.32');
        res.body[0].should.have.property('amount_per_person');
        res.body[0].amount_per_person.should.equal('78.66');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(1);
        done();
      });
    });
  });

  describe('POST /api/bill/pay/:billId', function() {
    it('should pay a single bill for a single user', function(done) {
      chai.request(server)
      .post('/api/bill/pay/1')
      .set('content-type', 'application/json')
      .send({ userId: 5 })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('bill_id');
        res.body[0].bill_id.should.equal(1);
        res.body[0].should.have.property('paid');
        res.body[0].paid.should.equal(true);
        res.body[0].should.have.property('date_paid');
        res.body[0].date_paid.should.equal('2016-09-10T05:00:00.000Z');
        done();
      })
    })
  })

  describe('POST /api/bill', function() {
    it('should create a bill', function(done) {
      chai.request(server)
      .post('/api/bill')
      .set('content-type', 'application/json')
      .send({
        companyName: 'testCompanyTest',
        dueDate: '2016-09-11',
        amountTotal: 300,
        userId: 2,
      })
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(3);
        res.body[0].should.have.property('company_name');
        res.body[0].company_name.should.equal('testCompanyTest');
        res.body[0].should.have.property('due_date');
        res.body[0].due_date.should.equal('2016-09-11T05:00:00.000Z');
        res.body[0].should.have.property('amount_total');
        res.body[0].amount_total.should.equal('300.00');
        res.body[0].should.have.property('amount_remaining');
        res.body[0].amount_remaining.should.equal('300.00');
        res.body[0].should.have.property('amount_per_person');
        res.body[0].amount_per_person.should.equal('150.00');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(2);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(2);
        done();
      })
    })
  })
});