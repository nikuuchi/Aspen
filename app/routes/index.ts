///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>

var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
    db.User.find().then(function(users) {
        res.render('top', { title: 'Aspen' });
    }, function(err){
        res.send(err);
    });
});

router.get('/subject/:file', function(req, res) {
    res.render('editor'); //FIXME
});

router.get('/user/:userid/subject/:file', function(req, res) {
    res.send('user:' + req.params.userid + ', subject:' + req.params.file);
});

router.get('/user/:userid/editor', function(req, res) {
    res.send('Editor: user:' + req.params.userid);
});


router.get('/user/:userid', function(req, res) {
    res.render('mypage');
});

router.get('/list/all', function(req, res) {
    res.render('submitedList');
});

router.get('/subject/:file', function(req, res) {
    res.send('file: '+ req.params.file);
});

router.get('/subject', function(req, res) {
    res.render('addSubject');
});


module.exports = router;
