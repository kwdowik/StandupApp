'use strict';

var mongodb = require('mongodb').MongoClient;

var dbService = function dbService() {

    var getUsers = function getUsers() {
        var url = 'mongodb://localhost/standupdb';
        return new Promise(function (resolve, reject) {
            mongodb.connect(url, function (err, db) {
                if (err) throw err;
                db.collection("users").find({}).toArray(function (err, users) {
                    if (err) reject(err);
                    console.log(users);
                    resolve(users);
                    db.close();
                });
            });
        });
    };

    return {
        getUsers: getUsers
    };
};

module.exports = dbService;
//# sourceMappingURL=dbService.js.map