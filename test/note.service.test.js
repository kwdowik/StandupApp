'use strict';

const noteService = require('../src/services/note.service');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiAsPromised);

describe('Note service', () => {
    const ValidNoteItem = {
      memberName: 'TestUser',
      project: 'TestProject',
      workYesterday: 'smth',
      workToday: 'smth',
      createdOn: new Date('2017-01-01')
    };
    const InvalidNoteItem = {
        memberName: 'TestUser_invalid',
        project: 'TestProject',
        workYesterday: 'smth',
        workToday: 'smth',
        createdOn: new Date('2017-01-01')
    };

    describe('#querySort method', () => {
        var ValidNoteItem_newer = Object.assign({},ValidNoteItem);
        ValidNoteItem_newer.createdOn = new Date('2017-01-02');
        before((done) => {
            noteService.createNote(ValidNoteItem);
            noteService.createNote(ValidNoteItem_newer)
                .then(() => done());
        });
        after((done) => {
            noteService.deleteNote(ValidNoteItem)
                .then(() => done());
        });
        it('Notes should be sorted by date descending', (done) => {
            const filter = ValidNoteItem.memberName;
            noteService.querySort(1, filter)
                .then(value => {
                    expect(value).to.be.a('array');
                    expect(value.length).to.equal(2);
                    expect(value[0].createdOn.getTime()).to.equal(ValidNoteItem_newer.createdOn.getTime());
                    expect(value[1].createdOn.getTime()).to.equal(ValidNoteItem.createdOn.getTime());
                    done();
                })
                .catch(err => done(err));
        });
    });

    describe('#getNumberOfNotes method', () => {
        function createNotes(number, done) {
            var promises = [];
            for(var i=0; i<number; i++) {
                promises.push(noteService.createNote(ValidNoteItem));
            }
            Promise.all(promises)
                .then(() => done())
                .catch(msg => console.log(`Smth went wrong ${msg}`));
        }
        function deleteNotes(number, done) {
            var promises = [];
        for(var i=0; i<number; i++) {
            promises.push(noteService.deleteNote(ValidNoteItem));
        }
        Promise.all(promises)
            .then(() => done())
            .catch(msg => console.log(`Smth went wrong ${msg}`));
        }
        before((done) => {
            createNotes(6, done);
        });
        after((done) => {
            deleteNotes(6, done);
        });
        it('6 Notes which was made before should be returned', () => {
            const expectedValue = 6;
            const filter = 'TestUser';
            const value = noteService.getNumberOfNotes(filter);
            return expect(value).to.eventually.equal(expectedValue);
        });
        it('Numbers of notes should be larger by 6', (done) => {
            noteService.getNumberOfNotes()
                .then(number => {
                    var expectedValue = number + 6;
                    createNotes(6, done);
                    noteService.getNumberOfNotes()
                        .then(value => {
                            return expect(value).to.equal(expectedValue);
                        })
                        .catch(err => {
                            done(err);
                        });
                })
        })
    });

    describe('#deleteTimeTable method', () => {
        before((done) => {
            noteService.createNote(ValidNoteItem)
                .then(() => done());
        });
        it('Existing work time event should be delete', () => {
            const expectedValue = '1 document(s) deleted';
            const value = noteService.deleteNote(ValidNoteItem);
            return expect(value).to.eventually.equal(expectedValue);
        });
        it('Non-existent work time event should not be delete', () => {
            const expectedValue = '0 document(s) deleted';
            const value = noteService.deleteNote(InvalidNoteItem);
            return expect(value).to.eventually.equal(expectedValue);
        });
    });

    describe('#createNote method', () => {
        after((done) => {
            noteService.deleteNote(ValidNoteItem)
                .then(() => done());
        });
        it('Valid note should be create', () => {
            const value = noteService.createNote(ValidNoteItem);
            return expect(value.then(o => o.ops[0].memberName)).to.eventually.equal(ValidNoteItem.memberName);
        })
    });
});