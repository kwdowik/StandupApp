'use strict';

var express = require('express');
var workTimeTableRouter = express.Router();

var router = function router(nav) {

    var workTimeTableController = require('../controllers/workTimeTableController')(nav);

    workTimeTableRouter.use(workTimeTableController.checkIfSignIn);

    workTimeTableRouter.route('/').get(workTimeTableController.getTimeTablePage);

    workTimeTableRouter.route('/getEvents').get(workTimeTableController.getEvents);

    /* CRUD implementation */
    workTimeTableRouter.route('/create').post(workTimeTableController.createTimeTable);

    workTimeTableRouter.route('/update').post(workTimeTableController.updateTimeTable);

    workTimeTableRouter.route('/delete').post(workTimeTableController.deleteTimeTable);

    return workTimeTableRouter;
};

module.exports = router;
//# sourceMappingURL=timeTableRoutes.js.map