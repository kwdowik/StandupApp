var Note = require('../models/noteModel');

exports.querySort = function(cardNumber, filter) {
    return function () {
        var query = Note.find({});
        if(filter !== undefined && filter !== '' && filter.length > 0 ) {
            query.where({memberName: filter});
        }
        return new Promise(
             function (resolve, reject) {
                query.sort({createdOn: 'desc'})
                    .skip((cardNumber - 1) * 5)
                    .limit(5)
                    .exec(function (err, results) {
                        if(err) reject(err);
                        resolve(results);
                    })
            }
        )
    }
};

exports.getNumberOfNotes = function(filter) {
    var query = Note.find({});
    console.log(`Filter: ${filter}`);
    if(filter === undefined || filter.length === 0) {
        return new Promise(
            function (resolve, reject) {
                query.count({}, function (err, count) {
                    if(err) reject(err);
                    resolve(count);
                });
            }
        );
    }else {
        return new Promise(
            function (resolve, reject) {
                query.count({memberName: filter}, function (err, count) {
                    if(err) reject(err);
                    resolve(count);
                });
            }
        );
    }
};

exports.createNote = function (data) {
    return new Note({
        memberName: data.memberName,
        project: data.project,
        workYesterday: data.workYesterday,
        workToday: data.workToday,
        impediment: data.impediment
    });
};


