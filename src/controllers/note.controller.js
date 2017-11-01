var Note = require('../models/noteModel');
var noteService = require('../services/note.service');

var noteController = function (nav) {

    var checkIfSignIn = function (req, res, next) {
        if(!req.user) {
            res.redirect('/auth');
        }
        next();
    };

    var createNewNote = function (req ,res) {
        let newNote = noteService.createNote(req.body);
        newNote.save(function (err) {
            if(err) {
                var errMsg = 'Sorry there was an error saving the stand-up meeting note. ' + err;
                res.render('newnote', {title: 'Standup - New Note (error)', message: errMsg});
            }
            else {
                console.log('Stand-up meeting note was saved!');
                res.redirect(301, '/');
            }
        });
    };

    var getNote = function (req, res) {
        res.render('newnote', {
            title: 'Standup - New Note',
            message: '',
            nav: nav,
            userName: req.user === undefined ? undefined : req.user.username
        });
    };
    
    return {
        getNote: getNote,
        createNewNote: createNewNote,
        checkIfSignIn: checkIfSignIn
    };
};

module.exports = noteController;
