var mongodb = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var authController = function (nav) {
    var getLoginPage = function (req, res) {
        console.log(`MESSAGE: ${req.message}`);
        res.render('login', {
            title: 'Login Page',
            nav: nav,
            message: req.query.error ? 'Invalid username or password.' : undefined,
            userName: req.user === undefined ? undefined : req.user.username
        });
    };

    var tryToSignIn = function (req, res) {
        res.redirect('/auth/profile');
    };

    var checkAuthentication = function (req, res, next) {
        console.log(`check auth, user: ${req.user.username}`);
        if(!req.user) {
            res.redirect('/auth');
        }
        next();
    };
    
    var signIn = function (req, res) {
        var message = 'User successful sign in.';
        res.redirect('/?message=' + message);
    };

    var signOut = function (req, res) {
      req.logout();
      var message = 'User successful sign out.';
      res.redirect('/?message=' + message);
    };

    var getRegisterPage = function (req, res) {
        res.render('register', {
            title: 'Register Page',
            nav: nav
        });
    };

    var register = function (req, res) {
        mongodb.connect('mongodb://localhost/standupdb', function (err, db) {
            var collection = db.collection('users');
            hashPassword(req.body.password)
                .then(function (hashedPassword) {
                    return user = {
                        username: req.body.userName,
                        password: hashedPassword
                    };
                })
                .then(function (user) {
                    collection.insert(user, function (err, results) {
                        var message = `User: ${user.username} successful registered.`;
                        if(err) {
                            message = err;
                        }
                        res.redirect('/?message=' + message);
                    });
                })
        });
    };

    function hashPassword(password) {
            return new Promise(
                function (resolve, reject) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                        console.log(hash);
                        resolve(hash.toString());
                        reject(err);
                    });
                }
            );
        });
    };

    return {
        getLoginPage: getLoginPage,
        tryToSignIn: tryToSignIn,
        signIn: signIn,
        signOut: signOut,
        checkAuthentication: checkAuthentication,
        getRegisterPage: getRegisterPage,
        register: register
    };

};

module.exports = authController;