///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>

var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/submit', function(req, res) {
});

router.post('/register', function(req, res) {
    var studentNumber = req.body.inputNumber;
    var userName = req.body.inputName;
    var userId   = req.session.UserId;
    db.User.find({github_id: req.session.UserId }).then(function(user) {
        user.studentNumber = studentNumber;
        user.name = userName;
        user.save().then(function() {
            res.redirect('/'); //FIXME
        }, function() {
            console.log('error');
            res.redirect('/'); //FIXME
        });
    }, function(err) {
        console.log(err);
    });
});

router.post('/compile', function(req, res) {
});

router.post('/poplar', function(req, res) {
});

module.exports = router;
