var dbService = require('./db.service');
const url = 'mongodb://localhost/standupdb';
const collectionName = 'users';
var bcrypt = require('bcrypt');

exports.getUsers = function () {
    return dbService.getAll(url, collectionName);
};

exports.insertUser = function (user) {
  return dbService.create(url, collectionName, user);
};

exports.hashPassword = function(password) {
    return new Promise(
        function (resolve, reject) {
            bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if(err) reject(err);
                        resolve(hash.toString());
                    });
                }
            );
        });
};