'use strict';

var app = require('../app'),
    chai = require('chai'),
    request = require('supertest');

var expect = chai.expect;

describe('Note Tests', function () {
    var testNote = {
        memberName: 'TestName',
        project: 'TestProject',
        workYesterday: 'merge',
        workToday: 'bug',
    };

    describe('Notes API Integration Tests', function () {

        describe('#GET /newnote', function () {
            it('should get all tasks', function (done) {
                request(app)
                    .get('/newnote')
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect('Location', '/newnote');
                        done();
                    });
            });
        });

        describe('#POST /newnote', function () {
            it('should get all tasks', function (done) {
                request(app)
                    .post('/newnote')
                    .send(testNote)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body.memberName).to.equal('TestName');
                        done();
                    });
            });
        });

        describe('#GET /', function () {
            it('should get all tasks', function (done) {
                request(app)
                    .get('/')
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });
        });

        describe('#POST /', function () {
            it('should get all tasks', function (done) {
                request(app)
                    .post('/')
                    .send(testNote)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);
                        expect(res.body).to.be.an('array');
                        expect(res.body[0].memberName).to.equal('TestName');
                        done();
                    });
            });
        });
    });

});