var userService = require('../services/user.service');
var noteService = require('../services/note.service');

var cardController = function (nav) {
    var getNotePage = function (req, res) {
        var users = [];
        var currentCard = req.params.cardNumber === undefined ? 1 : req.params.cardNumber;
        var numberOfCards = 1;
        noteService.getNumberOfNotes()
            .then(count => {
                numberOfCards = count;
            });
            userService.getUsers()
                .then(usersArr => {
                    users = usersArr;
                });
            noteService.querySort(currentCard)
                .then(results => {
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
            })
            .catch((msg) => console.log(`Err: ${msg}`));
    };

    var getNoteByMember = function (req, res) {
        var filter = req.body.memberName;
        var users = [];
        var numberOfCards = 1;
        noteService.getNumberOfNotes(filter)
            .then(count => {
                numberOfCards = count;
            });
        userService.getUsers()
            .then(usersArr => {
                users = usersArr;
            });
        noteService.querySort(1, filter)
            .then(results => {
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
