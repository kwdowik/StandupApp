var express = require('express');
var discussRouter = express.Router();

var router = function (io, nav) {

    var discussController = require('../controllers/discuss.controller')(io, nav);

    discussRouter.use(discussController.checkIfSignIn);

    discussRouter.route('/')
        .get(discussController.getDiscussPage);

    return discussRouter;
};

module.exports = router;