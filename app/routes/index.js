///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/subject/:file', function (req, res) {
    res.send('subject:' + req.params.file);
});

router.get('/user/:userid/subject/:file', function (req, res) {
    res.send('user:' + req.params.userid + ', subject:' + req.params.file);
});

router.get('/user/:userid/editor', function (req, res) {
    res.send('Editor: user:' + req.params.userid);
});

router.get('/user/:userid', function (req, res) {
    res.send('user:' + req.params.userid);
});

router.get('/list/all', function (req, res) {
    res.send('list');
});

router.get('/subject/:file', function (req, res) {
    res.send('file: ' + req.params.file);
});

router.get('/subject', function (req, res) {
    res.send('new subject');
});

module.exports = router;
