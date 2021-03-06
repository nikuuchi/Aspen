///<reference path="typings/express/express.d.ts" />
///<reference path="typings/node/node.d.ts" />
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var config = require('config');
var routes = require('./app/routes/index');
var passport = require('./app/routes/passport');
var post_api = require('./app/routes/post');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
if (app.get('env') === 'production') {
    var compression = require('compression');
    app.use(compression());
}
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(config.cookie.secret));
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
//passport
app.use(passport.passport.initialize());
app.use(passport.passport.session());
//using routing
app.use(routes);
app.use(post_api);
app.get('/login/github', passport.passport.authenticate('github'), function (req, res) {
});
app.get('/login/github/callback', passport.passport.authenticate('github', { failureRedirect: config.base.path + '/' }), passport.login);
app.get('/logout', passport.logout);
/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
