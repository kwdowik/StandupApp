var express = require('express');
var cardRouter = express.Router();

var router = function (nav) {

    var cardController = require('../controllers/card.controller')(nav);
    cardRouter.route('/')
        .get(cardController.getNotePage);

    cardRouter.route('/card')
        .get(cardController.getNotePage)
        .post(cardController.getNoteByMember);

    cardRouter.route('/card/:cardNumber')
        .get(cardController.getNotePage);

    return cardRouter;
};


module.exports = router;