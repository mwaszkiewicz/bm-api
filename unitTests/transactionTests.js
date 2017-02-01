process.env.NODE_ENV = 'test';

var chai = require('chai');
var mongoose = require('mongoose');
var server = require('../server');
var Transaction = require('../models/transaction');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();
var newTransaction;

describe('Transactions', function() {

    Transaction.collection.drop();

    beforeEach(function(done) {
        newTransaction = new Transaction({
            amount: 100,
            type: 'premia',
            description: 'premia kwartalna',
            date: '2017-01-14T13:00:00'
        });
        newTransaction.save(function(err) {
            done();
        });
    });
    afterEach(function(done) {
        Transaction.collection.drop();
        done();
    });

    it('should list ALL transactions on /transactions GET', function(done) {
        chai.request(server)
            .get('/api/transactions')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('amount');
                res.body[0].should.have.property('type');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('date');
                res.body[0].amount.should.equal(100);
                res.body[0].type.should.equal('premia');
                res.body[0].description.should.equal('premia kwartalna');
                res.body[0].date.should.equal('2017-01-14T13:00:00.000Z');
                done();
            });
    });

    it('should return one transaction by id on /transaction/:id GET', function(done) {
        chai.request(server)
            .get('/api/transaction/' + newTransaction.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body.should.have.property('amount');
                res.body.should.have.property('type');
                res.body.should.have.property('description');
                res.body.should.have.property('date');
                res.body.amount.should.equal(100);
                res.body.type.should.equal('premia');
                res.body.description.should.equal('premia kwartalna');
                res.body.date.should.equal('2017-01-14T13:00:00.000Z');
                done();
            });
    });

    it('should add a SINGLE transaction on /transaction POST', function(done) {
        chai.request(server)
            .post('/api/transaction')
            .send({
                'amount': 400,
                'date': '2016-01-03T23:11',
                'type': 'premia',
                'description': 'premia roczna'
            })
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.amount.should.equal(400);
                res.body.type.should.equal('premia');
                res.body.description.should.equal('premia roczna');
                res.body.date.should.equal('2016-01-03T23:11:00.000Z');
                done();
            });
    });

});
