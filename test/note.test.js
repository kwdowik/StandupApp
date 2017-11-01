'use strict';

var app = require('../app'),
    chai = require('chai'),
    request = require('supertest');

var expect = chai.expect;

describe('Routing', function () {
    var validNote = {
        memberName: 'TestName',
        project: 'TestProject',
        workYesterday: 'merge',
        workToday: 'bug',
    };

    var invalidNote = {
        memberName: 'None',
        project: 'TestProject',
        workYesterday: 'merge',
        workToday: 'bug',
    };

    describe('Notes API Integration Tests', function () {

        describe('#GET /newnote', function () {
            it('Returns a 302 response', function (done) {
                request(app)
                    .get('/newnote')
                    .end(function (err, res) {
                        if(err) done(err);
                        expect(res.statusCode).to.equal(302);
                        done();
                    });
            });
        });

        describe('#POST /newnote', function () {
            it('Returns a 302 response - valid note', function (done) {
                request(app)
                    .post('/newnote')
                    .send(validNote)
                    .end(function (err, res) {
                        if(err) done(err);
                        expect(res.statusCode).to.equal(302);
                        console.log(res.statusMessage);
                        done();
                    });
            });
            it('Returns a 302 response - invalid note',(done) => {
                request(app)
                    .post('/newnote')
                    .send(invalidNote)
                    .end((err, res) => {
                        if(err) done(err);
                        expect(res.statusCode).to.equal(302);
                        console.log(res.statusCode.message);
                        done();
                    })
            })
        });

        describe('#GET /', function () {
            it('Returns a 200 response', function (done) {
                request(app)
                    .get('/')
                    .end(function (err, res) {
                        if(err) done(err);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });

        describe('#GET /auth', function () {
            it('Returns a 200 response', function (done) {
                request(app)
                    .get('/')
                    .end(function (err, res) {
                        if(err) done(err);
                        expect(res.statusCode).to.equal(200);
                        done();
                    });
            });
        });
    });
});