var mongodb = require('mongodb').MongoClient;
var userService = require('../services/user.service');

var authController = function (nav) {
    var getLoginPage = function (req, res) {
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
        var user;
        userService.hashPassword(req.body.password)
            .then(function (hashedPassword) {
                 user = {
                    username: req.body.userName,
                    password: hashedPassword
                };
                console.log(user.username);
                return userService.insertUser(user)
            })
            .then(function () {
                var message = `User: ${user.username} successful registered`;
                res.redirect('/?message=' + message);
            })
            .catch(function (err) {
                res.redirect('/?message=' + err);
            })
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