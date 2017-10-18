var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

var router = function (nav) {
    var authController = require('../controllers/authController')(nav);

    authRouter.route('/')
        .get(authController.getLoginPage);

    authRouter.route('/login')
        .post(passport.authenticate('local', {
            failureRedirect: '/auth/?error=true'}), authController.tryToSignIn);

    authRouter.route('/logout')
        .get(authController.signOut);

    authRouter.route('/profile')
        .all(authController.checkAuthentication)
        .get(authController.signIn);

    authRouter.route('/register')
        .get(authController.getRegisterPage)
        .post(authController.register);

        return authRouter;
};

module.exports = router;
