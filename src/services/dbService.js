var mongodb = require('mongodb').MongoClient;

var dbService = function () {

    var getUsers = function () {
        var url = 'mongodb://kacper:kacper@ds155192.mlab.com:55192/standupdb';
        return new Promise(
            function (resolve, reject) {
                mongodb.connect(url, function (err, db) {
                    if (err) throw err;
                    db.collection("users").find({}).toArray(function (err, users) {
                        if (err) reject(err);
                        console.log(users);
                        resolve(users);
                        db.close();
                    });
                });
            }
        );
    };

    return {
        getUsers: getUsers
    };
};

module.exports = dbService;
