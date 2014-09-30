///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');
var http = require('http');
var config = require('config');

router.post('/submit', function (req, res) {
    //TODO
});

router.post('/subject/new', function (req, res) {
    //TODO
});

router.post('/register', function (req, res) {
    var studentNumber = req.body.inputNumber;
    var userName = req.body.inputName;
    var userId = req.session.UserId;
    db.User.find({ github_id: req.session.UserId }).then(function (user) {
        user.studentNumber = studentNumber;
        user.name = userName;
        user.save().then(function () {
            res.redirect('/'); //FIXME
        }, function () {
            console.log('error');
            res.redirect('/'); //FIXME
        });
    }, function (err) {
        console.log(err);
    });
});

router.post('/compile', function (req, res) {
    //dest server is configured by default.yaml
    var options = {
        hostname: config.compile.host,
        port: config.compile.port,
        path: config.compile.path,
        method: 'POST'
    };

    var request = http.request(options, function (response) {
        var body = '';
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var ret = JSON.parse(body);
            res.json(ret);
        });
    });

    //TODO POST
    request.end({ source: "hoge", option: "fuga", filename: "filename", userId: 0 });
});

router.post('/poplar', function (req, res) {
});

router.post('/dummy/compile', function (req, res) {
    var ret = {
        //src: "#include<stdio.h>\n\nint main() {\n\tprintf(\"hello\n\");\n}\n",
        dest: "Module['printf']('hello');",
        msg: ""
    };
    res.json(ret);
});

router.post('/dummy/poplar', function (req, res) {
});

module.exports = router;
