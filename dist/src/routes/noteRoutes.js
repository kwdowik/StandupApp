'use strict';

var express = require('express');
var noteRouter = express.Router();

var router = function router(nav) {
    var noteController = require('../controllers/noteController')(nav);

    noteRouter.use(noteController.checkIfSignIn);

    noteRouter.route('/').get(noteController.getNote).post(noteController.createNewNote);

    return noteRouter;
};

module.exports = router;
//# sourceMappingURL=noteRoutes.js.map