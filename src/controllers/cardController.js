var Note = require('../models/noteModel');
var dbService = require('../services/dbService')();

var cardController = function (nav) {

    var getNotePage = function (req, res) {
        if(req.params.cardNumber <= 0) {
            res.redirect('/');
        }
        var query = Note.find();
        var numberOfCards = 1;
        getNumberOfNotes().then(function (count) {
            numberOfCards = count;
        });
        dbService.getUsers().then(function (users) {
            query.sort({createdOn: 'desc'})
                .skip((req.params.cardNumber - 1) * 5)
                .limit(5)
                .exec(function (err, results) {
                    res.render('index',
                        {
                            title: 'Standup - List',
                            notes: results,
                            currentCard: req.params.cardNumber === undefined ? 1 : req.params.cardNumber,
                            numberOfCards: numberOfCards,
                            nav: nav,
                            message: req.query.message,
                            userName: req.user === undefined ? undefined : req.user.username,
                            users: users
                        });
                });
        });
    };

    var getNumberOfNotes = function (filter) {
        var query = Note.find();
        if(filter == null || filter.length === 0) {
            return new Promise(
                function (resolve, reject) {
                    query.count({}, function (err, count) {
                        console.log(`number of cards: ${count}`);
                        resolve(count);
                        reject(err);
                    });
                }
            );
        }else {
            return new Promise(
                function (resolve, reject) {
                    query.count({memberName: filter}, function (err, count) {
                        console.log(`number of cards: ${count}`);
                        resolve(count);
                        reject(err);
                    });
                }
            );
        }

    };

    var getNoteByMember = function (req, res) {
        var query = Note.find();
        var filter = req.body.memberName;
        var numberOfCards = 1;
        getNumberOfNotes(filter).then(function (count) {
            numberOfCards = count;
        });

        query.sort({ createdOn: 'desc'});

        if(filter.length > 0)
        {
            query.where({ memberName: filter })
                .limit(5);
        }else {
            query.skip((req.params.cardNumber - 1 ) * 5)
                .limit(5);
        }

        dbService.getUsers().then(function (users) {
            query.exec(function (err, results) {
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
            });
        });
    };

    return {
        getNotePage: getNotePage,
        getNoteByMember: getNoteByMember,
    };
};

module.exports = cardController;
