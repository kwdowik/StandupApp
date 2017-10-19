'use strict';

var WorkTime = require('../models/workTimeTableModel');
var dbService = require('../services/dbService')();
var mongodb = require('mongodb').MongoClient;

var workTimeTableController = function workTimeTableController(nav) {

    var getYourTimeTable = function getYourTimeTable(req, res) {
        console.log('UserName: ' + req.user.username);
        res.render('yourTimeTable', {
            title: 'Your Work Time Table',
            userName: req.user.username,
            nav: nav,
            message: ''
        });
    };

    var getTimeTableMenu = function getTimeTableMenu(req, res) {
        dbService.getUsers().then(function (users) {
            res.render('timeTableMenu', {
                title: 'Time Table Menu',
                userName: req.user == undefined ? undefined : req.user.username,
                nav: nav,
                message: '',
                users: users
            });
        });
    };

    var getTeammateTimeTable = function getTeammateTimeTable(req, res) {
        console.log('Selected Teammate: ' + req.body.teammateName);
        res.render('teammatesTimeTable', {
            title: req.body.teammateName + '\'s Work Time Table',
            userName: undefined,
            teammate: req.body.teammateName,
            nav: nav,
            message: ''
        });
    };

    var createTimeTable = function createTimeTable(req, res) {
        var item = req.body;
        item.user = req.user.username;
        console.log('memberName: ' + req.user.username);
        console.log('title: ' + item.title);
        console.log('start: ' + item.workStart);
        console.log('end: ' + item.workEnd);

        var newWorkTimeItem = createSchedule(item);
        newWorkTimeItem.save(function (err) {
            if (err) {
                var errMsg = 'Sorry there were an erorr saving the stand-up hour time. + ' + err;
                res.render('yourTimeTable', {
                    title: 'Work Time Table',
                    userName: req.user.username,
                    nav: nav,
                    message: errMsg
                });
            }
        });
    };

    var updateTimeTable = function updateTimeTable(req, res) {
        WorkTime.findOneAndUpdate({ id: req.body.id }, { start: req.body.workStart, end: req.body.workEnd }, function (err, workTimeItem) {
            if (err) console.error('Err: ' + err);
            console.log('Event ' + req.body.title + ' updated successfully');
        });
    };

    var deleteTimeTable = function deleteTimeTable(req, res) {
        console.log('ID: ' + req.body.id);
        WorkTime.findOneAndRemove({ id: req.body.id }, function (err) {
            if (err) console.error('Err: ' + err);
            console.log('Event delete successfully');
        });
    };

    function createSchedule(data) {
        return new WorkTime({
            id: data.id,
            memberName: data.user,
            title: data.title,
            start: data.workStart,
            end: data.workEnd
        });
    };

    var getEvents = function getEvents(req, res) {
        var query = WorkTime.find();
        var startTime = req.query.start;
        var endTime = req.query.end;
        var memberName = req.user == undefined ? req.query.username : req.user.username;
        console.log('User: ' + memberName);
        query.find({ $and: [{ memberName: memberName, start: { $gte: startTime }, end: { $lte: endTime } }] }).exec(function (err, workTimeItems) {
            if (err) {
                console.error('Error: ' + err);
            }
            console.log('Results: ' + workTimeItems);
            res.send(workTimeItems);
        });
    };

    // var getUsers = function () {
    //     var url = 'mongodb://localhost/standupdb';
    //     return new Promise(
    //         function (resolve, reject) {
    //     mongodb.connect(url, function (err, db) {
    //         if (err) throw err;
    //             db.collection("users").find({}).toArray(function (err, users) {
    //                 if (err) reject(err);
    //                 console.log(users);
    //                 resolve(users);
    //                 db.close();
    //             });
    //             });
    //         }
    //     );
    // };

    return {
        getYourTimeTable: getYourTimeTable,
        getTimeTableMenu: getTimeTableMenu,
        getTeammateTimeTable: getTeammateTimeTable,
        createTimeTable: createTimeTable,
        updateTimeTable: updateTimeTable,
        deleteTimeTable: deleteTimeTable,
        getEvents: getEvents
    };
};

module.exports = workTimeTableController;
//# sourceMappingURL=timeTableController.js.map