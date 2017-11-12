var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var requiredStringValidator = [
    function (value) {
        var testValue = value.trim();
        console.log(`Validation: ${testValue.length > 0}`);
        return (testValue.length > 0);
    },
    '{PATH} cannot be empty'];

var workTimeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        validation: requiredStringValidator
    },
    memberName: {
        type: String,
        required: true,
        validation: requiredStringValidator
    },
    title: {
        type: String,
        default: 'Work'
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