'use strict';

const timeTableService = require('../src/services/timeTable.service');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Time table service', () => {
    const WorkTimeTable = {
        id: '123123',
        user: 'TestUsername',
        title: 'TestTitle',
        workStart: new Date('2017-01-02'),
        workEnd: new Date('2017-01-02')
    };
    const InvalidWorkTimeTable = {
        id: '123125',
        user: 'TestUsername',
        title: 'TestTitle',
        workStart: new Date('2017-01-02'),
        workEnd: new Date('2017-01-02')
    };

    describe('#createTimeTable method', () => {
        after((done) => {
            timeTableService.deleteTimeTable(WorkTimeTable)
                .then(() => done());
        });
        it('Valid work time table should be create', () => {
            const value = timeTableService.createTimeTable(WorkTimeTable);
            return expect(value.then(o => o.ops[0].id)).to.eventually.equal(WorkTimeTable.id);
        });
    });

    describe('#updateTimeTable method', () => {
        const ValidUpdatedWorkTimeTable = {
            id: '123123',
            user: 'TestUsername',
            title: 'TestTitle',
            workStart: new Date('2017-01-03'),
            workEnd: new Date('2017-01-03'),
        };
        const InvalidUpdatedWorkTimeTable = {
            id: '123125',
            user: 'TestUsername',
            title: 'TestTitle',
            workStart: new Date('2017-01-03'),
            workEnd: new Date('2017-01-03'),
        };
        before((done) => {
            timeTableService.createTimeTable(WorkTimeTable)
                .then(() => done());
        });
        after((done) => {
            timeTableService.deleteTimeTable(WorkTimeTable)
                .then(() => done());
        });
        it('Existing work time event should be update', () => {
            const expectedValue = '1 document(s) updated';
            const value = timeTableService.updateTimeTable(ValidUpdatedWorkTimeTable);
            return expect(value).to.eventually.equal(expectedValue);
        });
        it('Non-existent work time event should not be update', () => {
           const expectedValue = '0 document(s) updated';
           const value = timeTableService.updateTimeTable(InvalidUpdatedWorkTimeTable);
           return expect(value).to.eventually.equal(expectedValue);
        })
    });

    describe('#deleteTimeTable method', () => {
        before((done) => {
            timeTableService.createTimeTable(WorkTimeTable)
                .then(() => done());
        });
        it('Existing work time event should be delete', () => {
            const expectedValue = '1 document(s) deleted';
            const value = timeTableService.deleteTimeTable(WorkTimeTable);
            return expect(value).to.eventually.equal(expectedValue);
        });
        it('Non-existent work time event should not be delete', () => {
            const expectedValue = '0 document(s) deleted';
            const value = timeTableService.deleteTimeTable(InvalidWorkTimeTable);
            return expect(value).to.eventually.equal(expectedValue);
        });
    });

    describe('#getTimeTableEvents method', () => {
        const ValidGroupOfEvents = {
            username: 'TestUsername',
            start: new Date('2017-01-01'),
            end: new Date('2017-01-05')
        };
        before((done) => {
            timeTableService.createTimeTable(WorkTimeTable)
                .then(() => done());
        });
        after((done) => {
            timeTableService.deleteTimeTable(WorkTimeTable)
                .then(() => done());
        });
        it('Work time events collection should be a array', () => {
            const value = timeTableService.getTimeTableEvents(ValidGroupOfEvents);
            return expect(value).to.eventually.to.be.a('array');
        });
        it('Work time events collection should return previous added event', () => {
            const value = timeTableService.getTimeTableEvents(ValidGroupOfEvents);
            return expect(value.then(o => o[0].id)).to.eventually.to.equal(WorkTimeTable.id);
        });
        it('Work time events collection should have length equal 1', () => {
            const value = timeTableService.getTimeTableEvents(ValidGroupOfEvents);
            expect(value.then(o => o.length)).to.eventually.to.equal(1);
        });
    });
});