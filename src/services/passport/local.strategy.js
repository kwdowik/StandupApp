var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
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
                    bcrypt.compare(password, user.password, function(err, res) {
                        if (err) return done(err);
                        if (res === false) {
                            return done(null, false, {message: 'Wrong password'});
                        } else {
                            return done(null, user);
                        }
                      });
                  });
          });
      }));
};