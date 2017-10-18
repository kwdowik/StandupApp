'use strict';

var express = require('express');
var discussRouter = express.Router();
var authController = require('../controllers/authController')();

var router = function router(io, nav) {

    var discussController = require('../controllers/discussController')(io, nav);

    discussRouter.use(discussController.checkIfSignIn);

    discussRouter.route('/').get(discussController.getDiscussPage);

    return discussRouter;
};

module.exports = router;
//# sourceMappingURL=discussRoutes.js.map