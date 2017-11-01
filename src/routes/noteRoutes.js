var express = require('express');
var noteRouter = express.Router();

var router = function (nav) {
    var noteController = require('../controllers/note.controller')(nav);

    noteRouter.use(noteController.checkIfSignIn);

    noteRouter.route('/')
        .get(noteController.getNote)
        .post(noteController.createNewNote);

    return noteRouter;

};

module.exports = router;
