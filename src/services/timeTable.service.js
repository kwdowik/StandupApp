var dbService = require('./db.service');
const url = 'mongodb://localhost/standupdb';
const collectionName = 'worktimes';
const WorkTime = require('../models/workTimeTableModel');

exports.createTimeTable = function(data) {
    var workTimeTableItem = new WorkTime({
        id: data.id,
        memberName: data.user,
        title: data.title,
        start: data.workStart,
        end: data.workEnd
    });
    return dbService.create(url, collectionName, workTimeTableItem);
};

exports.updateTimeTable = function (data) {
    var searchQuery =
    {
        id: data.id
    };
    var updateQuery =
    {
        $set: {
            start: new Date(data.workStart),
            end: new Date(data.workEnd)
        }
    };
    return dbService.update(url, collectionName, data, searchQuery, updateQuery);
};

exports.deleteTimeTable = function (data) {
    var query = {
        id: data.id
    };
    return dbService.delete(url, collectionName, query)
};

exports.getTimeTableEvents = function(data, user) {
    var startISODate = new Date(data.start);
    var endISODate = new Date(data.end);
    var memberName = data.username == undefined ? user.username : data.username;
    var query = {
        memberName: memberName, start: {$gte: startISODate} ,end: {$lte: endISODate}
    };
    return dbService.read(url, collectionName, query)
};

