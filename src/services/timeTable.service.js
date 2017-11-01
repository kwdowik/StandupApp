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

