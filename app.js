var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    socket_io = require('socket.io'),
    path = require('path'),
    session = require('express-session'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    mongoose = require('mongoose');

var port = process.env.PORT || 5000;
var io = socket_io(http);
app.io = io;

var navbar = [
    {Link: '/newnote', Text: 'New note'},
    {Link: '/discuss', Text: 'Discuss'},
    {Link: '/auth', Text: 'Sign In'},
    {Link: '/auth/logout', Text: 'Sign Out'},
    {Link: '/workTimeTable', Text: 'Time Table'},
];

// Mongoose ODM...
mongoose.Promise = global.Promise;
var mongoose = require('mongoose');

// Connect to MongoDB...
mongoose.connect('mongodb://localhost/standupdb', {
    useMongoClient: true});

// Logs that we connected to MongoDb
var connectStatus = mongoose.connection;
connectStatus.once('open', function () {
    console.log('Connected to Mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/fullcalendar', express.static(path.join(__dirname, '/node_modules/fullcalendar/dist/')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/jquery-ui', express.static(path.join(__dirname, '/node_modules/jquery-ui/external/jquery-1.12.1')));
app.use('/moment', express.static(path.join(__dirname, '/node_modules/moment/min/')));
app.use(express.static(path.join(__dirname, 'public')));

var sessionOption = {
    secret: 'standupApp',
    resave: false,
    saveUninitialized: false,
    cookie: {}
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));

require('./src/services/passport/passport.service')(app);

var noteRoutes = require('./src/routes/noteRoutes')(navbar);
var cardRoutes = require('./src/routes/cardRoutes')(navbar);
var discussRoutes = require('./src/routes/discussRoutes')(io, navbar);
var authRoutes = require('./src/routes/authRoutes')(navbar);
var workTimeRoutes = require('./src/routes/timeTableRoutes')(navbar);

app.use('/', cardRoutes);
app.use('/newnote', noteRoutes);
app.use('/discuss', discussRoutes);
app.use('/auth', authRoutes);
app.use('/workTimeTable', workTimeRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

http.listen(port, function(){
    console.log(`Server listening on port ${port}!`);

});


module.exports = app;
