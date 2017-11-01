var express = require('express');
var timeTableRouter = express.Router();

var router = function (nav) {

    var workTimeTableController = require('../controllers/timeTable.controller')(nav);

    timeTableRouter.route('/')
        .get(workTimeTableController.getTimeTableMenu);

    timeTableRouter.route('/getYourTimeTable')
        .get(workTimeTableController.getYourTimeTable);

    timeTableRouter.route('/getTeammateTimeTable')
        .post(workTimeTableController.getTeammateTimeTable);

    timeTableRouter.route('/getEvents')
        .get(workTimeTableController.getEvents);

    /* CRUD implementation */
    timeTableRouter.route('/create')
        .post(workTimeTableController.createTimeTable);

    timeTableRouter.route('/update')
        .post(workTimeTableController.updateTimeTable);

    timeTableRouter.route('/delete')
        .post(workTimeTableController.deleteTimeTable);
    /* End CRUD implementation */

    return timeTableRouter;
};

module.exports = router;
