var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
    userService = require('../user.service');
    bcrypt = require('bcrypt');


module.exports = function () {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
    },
      function (username, password, done) {
          var url = 'mongodb://localhost/standupdb';

          mongodb.connect(url, function (err, db) {
              var collection = db.collection('users');
              collection.findOne({username: username},
                  function (err, user) {
                    if(err) return err;
                    if(user === null) return done(null, false, {message: `${username} doesn't exist.`});
                    userService.encryptPassword(password, user.password)
                        .then((response) => {
                            if(response == false) {
                                return done(null, false, {message: 'Wrong password'});
                            } else {
                                return done(null, user);
                            }
                        })
                        .catch((err) => {
                           done(err);
                        });
                  });
          });
      }));
};