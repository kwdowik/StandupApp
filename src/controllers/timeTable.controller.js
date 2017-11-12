var userService = require('../services/user.service');
var timeTableService = require('../services/timeTable.service');
var mongodb = require('mongodb').MongoClient;

var workTimeTableController = function (nav) {

    var getYourTimeTable = function (req, res) {
        res.render('yourTimeTable',
            {
                title: 'Your Work Time Table',
                userName: req.user.username,
                nav: nav,
                message: ''
            });
    };

    var getTimeTableMenu = function (req, res) {
        userService.getUsers()
            .then(function (users) {
            res.render('timeTableMenu',
                {
                    title: 'Time Table Menu',
                    userName: req.user == undefined ? undefined : req.user.username,
                    nav: nav,
                    message: '',
                    users: users
                });
        });
    };
    
    var getTeammateTimeTable = function (req, res) {
        res.render('teammatesTimeTable',
            {
                title: `${req.body.teammateName}'s Work Time Table`,
                userName: req.user == undefined ? undefined : req.user.username,
                teammate: req.body.teammateName,
                nav: nav,
                message: ''
            });
    };

    var createTimeTable = function (req, res) {
        let item = req.body;
        item.user = req.user.username;
        timeTableService.createTimeTable(item)
            .then(msg => {
                console.log(msg);
            })
            .catch(err => {
                var errMsg = `Sorry there were an error saving the stand-up hour time. + ${err}`;
                res.render('yourTimeTable',
                    {
                        title: 'Work Time Table',
                        userName: req.user.username,
                        nav: nav,
                        message: errMsg
                    });
            })
    };

    var updateTimeTable = function (req, res) {
        timeTableService.updateTimeTable(req.body)
            .then(function (updatedWorkItem) {
                console.log(`${updatedWorkItem.id} updated successful.`);
            })
            .catch(function (err) {
               console.error(`Err: ${err}`);
            })
    };

    var deleteTimeTable = function (req, res) {
        timeTableService.deleteTimeTable(req.body)
            .then(function (deletedWorkItem) {
                console.log(`Event ${deletedWorkItem.id} deleted successfully`);
            })
            .catch(function (err) {
                console.log(`Error during deleting event.\nError: ${err}`);
            });
    };

    var getEvents = function (req, res) {
      timeTableService.getTimeTableEvents(req.query, req.user)
          .then(function (workTimeEvents) {
              console.log(`Results: ${workTimeEvents}`);
              res.send(workTimeEvents);
          })
          .catch(function (err) {
              console.log(`Error in getEvents()\nError: ${err}`);
          });
    };

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