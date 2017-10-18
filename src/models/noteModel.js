var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var memberNameValidation = [
    function (value) {
        return (value.length > 0 && value.toLocaleLowerCase() != 'none');
    },
    'Select a valid member name.'];

var requiredStringValidator = [
    function (value) {
        var testValue = value.trim();
        return (testValue.length > 0);
    },
    '{PATH} cannot be empty'];

var noteSchema = new Schema({
    memberName: {
        type: String,
        require: true,
        validate: memberNameValidation
    },
    project:  {
        type: String,
        require: true,
        validate: memberNameValidation
    },
    workYesterday:  {
        type: String,
        require: true,
        validate: requiredStringValidator
    },
    workToday:  {
        type: String,
        require: true,
        validate: requiredStringValidator
    },
    impediment:  {
        type: String,
        require: true,
        default: 'none'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);