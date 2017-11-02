var WorkTime = require('../models/workTimeTableModel');

exports.createTimeTable = function(data) {
    return new WorkTime({
        id: data.id,
        memberName: data.user,
        title: data.title,
        start: data.workStart,
        end: data.workEnd
    });
};

exports.updateTimeTable = function (data) {
    var query = WorkTime.find({});
    return new Promise(
        function (resolve, reject) {
            query.findOneAndUpdate({id: data.id }, { start: data.workStart, end: data.workEnd },
                function (err, workTimeItem) {
                    if(err) reject(err);
                    resolve(workTimeItem);
            });
        });
};

exports.deleteTimeTable = function (data) {
    var query = WorkTime.find({});
    return new Promise(
        function (resolve, reject) {
            query.findOneAndRemove({id: data.id },
                function (err) {
                    if(err) reject(err);
                    resolve()
            });
        }
    )
};

exports.getTimeTableEvents = function(data, user) {
    var query = WorkTime.find({});
    return new Promise(
        function (resolve, reject) {
            var memberName = data.username == undefined ? user.username : data.username;
            query.find({$and: [{memberName: memberName ,start: {$gte: data.start}, end: {$lte: data.end}}]})
                .exec(function (err, workTimeEvents) {
                    if(err) reject(err);
                    resolve(workTimeEvents)
                });
        }
    );
};

