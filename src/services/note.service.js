var Note = require('../models/noteModel');
const url = 'mongodb://localhost/standupdb';
const collectionName = 'notes';
var dbService = require('../services/db.service');


exports.createNote = function(data) {
    var noteItem = new Note({
        memberName: data.memberName,
        project: data.project,
        workYesterday: data.workYesterday,
        workToday: data.workToday,
        impediment: data.impediment,
        createdOn: data.createdOn
    });
    return dbService.create(url, collectionName, noteItem);
};

exports.deleteNote = function (note) {
    var query = {
        memberName: note.memberName
    };
    return dbService.delete(url, collectionName, query);
};

exports.querySort = function(cardNumber, filter) {
    var filterQuery;
    if(filter !== undefined && filter !== '' && filter.length > 0 ) {
        filterQuery = {
            memberName: filter
        };
    }
    var sortQuery = {
        createdOn: -1
    };
    return dbService.readAndModifyBehaviour(url, collectionName, sortQuery, filterQuery, (cardNumber - 1) * 5, 5);
};

exports.getNumberOfNotes = function(filter) {
    var query;
    if(filter !== undefined && filter.length !== 0){
        query = {
            memberName: filter
        };
    }
    return dbService.count(url, collectionName, query);
};

