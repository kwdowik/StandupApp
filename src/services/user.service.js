var dbService = require('./db.service');
const url = 'mongodb://localhost/standupdb';
const collectionName = 'users';
var bcrypt = require('bcrypt');

exports.getUsers = function () {
    return dbService.read(url, collectionName);
};

exports.insertUser = function (user) {
  return dbService.create(url, collectionName, user);
};

exports.deleteUser = function (user) {
    var query = {
     user: user.user
    };
  return dbService.delete(url, collectionName, query);
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

exports.encryptPassword = function (password, userpassword) {
    return new Promise(
        function (resolve, reject) {
            bcrypt.compare(password, userpassword, function(err, response) {
                if(err) reject(err);
                resolve(response);
            })
        }
    )
};
