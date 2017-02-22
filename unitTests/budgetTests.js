process.env.NODE_ENV = 'test';

var chai = require('chai');
var mongoose = require('mongoose');
var server = require('../server');
var Budget = require('../models/budget');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();
var initialBudget;

describe('Budget', function() {

    Budget.collection.drop();

    beforeEach(function(done) {
        initialBudget = new Budget({
            state: 1600,
            date: '2017-01-14T13:00:00'
        });
        initialBudget.save(function(err) {});

        firstBudget = new Budget({
            state: 2400,
            date: '2017-02-01T11:00:00'
        });
        firstBudget.save(function(err) {
            done();
        });

        secondBudget = new Budget({
            state: 3500,
            date: '2017-01-14T11:00:00'
        });
        secondBudget.save(function(err) {});

    });
    afterEach(function(done) {
        Budget.collection.drop();
        done();
    });

    it('get current budget value on /budget GET', function(done) {
        chai.request(server)
            .get('/api/budget')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body.should.have.property('state');
                res.body.should.have.property('date');
                res.body.state.should.equal(2400);
                res.body.date.should.equal('2017-02-01T11:00:00.000Z');
                done();
            });
    });

    it('should return one budget by id on /budget/:id GET', function(done) {
        chai.request(server)
            .get('/api/budget/' + initialBudget.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body.should.have.property('state');
                res.body.should.have.property('date');
                res.body.state.should.equal(1600);
                res.body.date.should.equal('2017-01-14T13:00:00.000Z');
                done();
            });
    });

    it('should list ALL budgets on /budgets GET (compare first element details)', function(done) {
        chai.request(server)
            .get('/api/budgets')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('state');
                res.body[0].should.have.property('date');
                res.body[0].state.should.equal(2400);
                res.body[0].date.should.equal('2017-02-01T11:00:00.000Z');
                done();
            });
    });

    it('should add a SINGLE budget on /budget POST', function(done) {
        chai.request(server)
            .post('/api/budget')
            .send({
                'state': 400,
                'date': '2016-01-03T23:11'
            })
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.state.should.equal(400);
                res.body.date.should.equal('2016-01-03T23:11:00.000Z');
                done();
            });
    });

});
