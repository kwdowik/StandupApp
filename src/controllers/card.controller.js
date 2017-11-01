var Note = require('../models/noteModel');
var userService = require('../services/user.service');
var noteService = require('../services/note.service');

var cardController = function (nav) {
    var getNotePage = function (req, res) {
        var users = [];
        var currentCard = req.params.cardNumber === undefined ? 1 : req.params.cardNumber;
        var numberOfCards = 1;
        noteService.getNumberOfNotes()
            .then(function (count) {
                console.log(`Count ${count}`);
                numberOfCards = count;
            })
            .then(userService.getUsers)
            .then(function (usersArr) {
                users = usersArr;
            })
            .then(noteService.querySort(currentCard))
            .then(function (results) {
                res.render('index',
                    {
                        title: 'Standup - List',
                        notes: results,
                        currentCard: currentCard,
                        numberOfCards: numberOfCards,
                        nav: nav,
                        message: req.query.message,
                        userName: req.user === undefined ? undefined : req.user.username,
                        users: users
                    });
            });
    };

    var getNoteByMember = function (req, res) {
        var filter = req.body.memberName;
        var users = [];
        var numberOfCards = 1;
        noteService.getNumberOfNotes(filter)
            .then(function (count) {
                numberOfCards = count;
            })
            .then(userService.getUsers)
            .then(function (usersArr) {
                users = usersArr;
            })
            .then(noteService.querySort(1, filter))
            .then(function (results) {
                res.render('index',
                    {
                        title: "Standup - List",
                        notes: results,
                        nav: nav,
                        currentCard: 1,
                        numberOfCards: numberOfCards,
                        userName: req.user === undefined ? undefined : req.user.username,
                        users: users
                    });
            })
    };

    return {
        getNotePage: getNotePage,
        getNoteByMember: getNoteByMember,
    };
};

module.exports = cardController;
