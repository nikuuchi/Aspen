///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(db.User);
    db.User.findAll().success(function (users) {
        res.render('index', { title: 'Express' });
    }).error(function (error) {
        res.send("error");
    });
});

module.exports = router;
