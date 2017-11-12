'use strict';

const userService = require('../src/services/user.service');
const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

describe('User Service', () => {

    describe('#hashPassword method', () => {
        it('Hashed password should be a string',() => {
            const encryptedPassword = 'test';
            const result = userService.hashPassword(encryptedPassword);
            return expect(result).to.eventually.to.be.a('string');
        });
    });

    describe('#encryptPassword method', () => {
        it('Encrypted password should be the same as original', () => {
            const password = 'test';
            const encryptedPassword = userService.hashPassword(password)
                .then((hashedPassword) => {
                    return userService.encryptPassword(password, hashedPassword);
                });
            return expect(encryptedPassword).to.eventually.be.true;
        });
        it('Encrypted password should not be the same as original', () => {
            const password = 'test';
            const encryptedPassword = userService.hashPassword(password)
                .then((hashedPassword) => {
                    const changedPassword = 'test2';
                    return userService.encryptPassword(changedPassword, hashedPassword);
                });
            return expect(encryptedPassword).to.eventually.be.false;
        });
    });

    describe('#getUsers method', () => {
        it('Users should be a array', () => {
            const result = userService.getUsers();
            return expect(result).to.eventually.to.be.a('array');
        });
    });

    describe('#insertUser method', () => {
        const testUser = {
            user: 'UserName',
            password: 'UserPassword'
        };
        after((done) => {
            userService.deleteUser(testUser)
                .then(() => done());
        });
        it('User should be add', () => {
            const expectedValue = 1;
            const value = userService.insertUser(testUser);
            expect(value.then(o => o.insertedCount)).to.eventually.equal(expectedValue);
            expect(value.then(o => o.ops[0].user)).to.eventually.equal(testUser.user);
            return expect(value.then(o => o.ops[0].password)).to.eventually.equal(testUser.password);
        });
    });

    describe('#deleteUser method', () => {
        const testUser = {
            user: 'UserName',
            password: 'UserPassword'
        };
        const invalidTestUser = {
            user: 'invalidUserName',
            password: 'invalidUserPassword'
        };
        before((done) => {
            userService.insertUser(testUser)
                .then(() => done());
        });
        it('User who exists should be delete', () => {
            const expectedValue = '1 document(s) deleted';
            const value = userService.deleteUser(testUser);
            return expect(value).to.eventually.equal(expectedValue);
        });
        it('User who does not exist should not be delete', () => {
            const expectedValue = '0 document(s) deleted';
            const value = userService.deleteUser(invalidTestUser);
            return expect(value).to.eventually.equal(expectedValue);
        })
    })
});