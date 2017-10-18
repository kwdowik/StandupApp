'use strict';

var WorkTime = require('../models/workTimeTableModel');

var workTimeTableController = function workTimeTableController(nav) {

    var getTimeTablePage = function getTimeTablePage(req, res) {

        console.log('UserName: ' + req.user.username);
        res.render('workTimeTable', {
            title: 'Work Time Table',
            userName: req.user.username,
            nav: nav,
            message: ''
        });
    };

    var getTimeTableMenu = function getTimeTableMenu(req, res) {

        res.render('timeTableMenu', {
            title: 'Time Table Menu',
            userName: req.user.username,
            nav: nav,
            message: ''
        });
    };

    var createTimeTable = function createTimeTable(req, res) {
        var item = req.body;
        console.log('memberName: ' + req.body.user);
        console.log('title: ' + item.title);
        console.log('start: ' + item.workStart);
        console.log('end: ' + item.workEnd);

        var newWorkTimeItem = createSchedule(item);
        newWorkTimeItem.save(function (err) {
            if (err) {
                var errMsg = 'Sorry there were an erorr saving the stand-up hour time. + ' + err;
                res.render('workTimeTable', {
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
        query.find({ $and: [{ memberName: req.user.username, start: { $gte: startTime }, end: { $lte: endTime } }] }).exec(function (err, workTimeItems) {
            if (err) {
                console.error('Error: ' + err);
            }
            console.log('Results: ' + workTimeItems);
            res.send(workTimeItems);
        });
    };

    return {
        getTimeTablePage: getTimeTablePage,
        getTimeTableMenu: getTimeTableMenu,
        createTimeTable: createTimeTable,
        updateTimeTable: updateTimeTable,
        deleteTimeTable: deleteTimeTable,
        checkIfSignIn: checkIfSignIn,
        getEvents: getEvents
    };
};

module.exports = workTimeTableController;
//# sourceMappingURL=timeTableController.js.map