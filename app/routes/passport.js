///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var passport = require('passport');

var github = require('passport-github').Strategy;
var config = require('config');

var Auth = require('../helper/auth');
var db = require('../models');

exports.login = function (req, res) {
    var user = req.user;
    var userName = user.username;
    var userId = user.id;

    var Referer = req.header('Referer');
    if (Referer == null) {
        Referer = config.passport.host_url + '/';
    }

    //Login
    db.User.find({ where: { name: userName, github_id: userId } }).then(function (result) {
        if (result != null) {
            //Login succeeded.
            console.log("user is found.");
            var auth = new Auth.Auth(req, res);
            auth.set(userId, userName);
            console.log("Redirect.");
            res.redirect(Referer);
        } else {
            //User Registration
            db.User.create({ name: userName, github_id: userId, password: '' }).then(function (result) {
                console.log("user created.");
                var auth = new Auth.Auth(req, res);
                auth.set(userId, userName);
                res.redirect(Referer + 'register');
            }, function (error) {
                console.log('error');
                console.log(error);
                res.redirect(Referer);
            });
        }
    }, function (error) {
        console.log(error);
        res.redirect(Referer);
    });
};

exports.logout = function (req, res) {
};

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

(function () {
    if (config.passport.github.client_id == '')
        return;
    console.log(config.passport.host_url + "/login/github/callback");
    passport.use(new github({
        clientID: config.passport.github.client_id,
        clientSecret: config.passport.github.client_secret,
        callbackURL: config.passport.host_url + "/login/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
        console.log(config.passport.github);
        process.nextTick(function () {
            return done(null, profile);
        });
    }));
})();

exports.passport = passport;
