
var discussController = function (io, nav) {

    require('../services/socket.io.service')(io);

    var checkIfSignIn = function (req, res, next) {
        if(!req.user) {
            res.redirect('/auth');
        }
        next();
    };

  var getDiscussPage = function (req, res) {
        res.render('discuss', {
            title: 'Discuss - chat',
            userName: req.user === undefined ? undefined : req.user.username,
            nav: nav
        });
    };

  return {
      getDiscussPage: getDiscussPage,
      checkIfSignIn: checkIfSignIn
  };

};

module.exports = discussController;


