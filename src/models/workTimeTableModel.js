var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workTimeSchema = new Schema({
    id: {
      type: String,
      require: true
    },
    memberName: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        default: Date.now
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WorkTime', workTimeSchema);