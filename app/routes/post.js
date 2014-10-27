///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');
var http = require('http');
var config = require('config');
var Promise = require('bluebird');
var formatDate = require('../helper/date').formatDate;
router.post('/save', function (req, res) {
    if (!req.signedCookies) {
        res.status(401).json({ error: "error" });
        return;
    }
    var content = req.body.content;
    var subjectId = req.body.subjectId; //TODO validation
    var gUserId = req.signedCookies.sessionUserId;
    db.User.findByGithub(gUserId).then(function (user) {
        return db.SubmitStatus.saveTemporary(content, user.id, subjectId, db.Sequelize, Promise);
    }).then(function (submit) {
        console.log(submit);
        res.json({});
    }).catch(function () {
        res.status(401).json({ error: "something bad" });
    });
});
router.post('/submit', function (req, res) {
    if (!req.signedCookies) {
        res.status(401).json({ error: "error" });
        return;
    }
    var content = req.body.content;
    var subjectId = req.body.subjectId; //TODO validation
    var gUserId = req.signedCookies.sessionUserId;
    db.User.findByGithub(gUserId).then(function (user) {
        return db.SubmitStatus.submit(content, user.id, subjectId, db.Sequelize);
    }).then(function (submit) {
        console.log(submit);
        res.json({ status: submit.status, date: formatDate('YYYY-MM-DD HH:mm', submit.updatedAt) });
    }).catch(function () {
        res.status(401).json({ error: "something bad" });
    });
});
router.post('/subject/new', function (req, res) {
    var subject_name = req.body.name;
    var subject_endAt = req.body.limit;
    if (req.body.limit == null || req.body.limit == 0) {
        subject_endAt = new Date();
    }
    var subject_startAt = new Date();
    var content = req.body.content;
    var example = req.body.example;
    console.log(content);
    db.Subject.createOrUpdate(subject_name, subject_endAt, req.body.subjectId, content, example).then(function (subject) {
        console.log(subject);
        res.redirect(config.base.path + '/');
    }).catch(function (err) {
        console.log(err);
        res.redirect(config.base.path + '/');
    });
});
router.post('/register', function (req, res) {
    var studentNumber = req.body.inputNumber;
    var userName = req.body.inputName;
    var userId = req.signedCookies.sessionUserId;
    console.log(req.signedCookies);
    db.User.find({ where: { github_id: userId } }).then(function (user) {
        user.studentNumber = studentNumber;
        user.name = userName;
        user.save().then(function () {
            res.redirect(config.base.path + '/'); //FIXME
        }, function () {
            console.log('error');
            res.redirect(config.base.path + '/'); //FIXME
        });
    }, function (err) {
        console.log(err);
    });
});
var post_compile_option = {
    hostname: config.compile.host,
    port: config.compile.port,
    path: config.compile.path,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};
router.post('/compile', function (req, res) {
    //dest server is configured by default.yaml
    var client_body = req.body;
    if (req.signedCookies.sessionUserId) {
        client_body.userId = req.signedCookies.sessionUserId;
    }
    var request = http.request(post_compile_option, function (response) {
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
    request.write(JSON.stringify(client_body));
    request.write('\n');
    request.end();
});
var post_poplar_option = {
    hostname: config.poplar.host,
    port: config.poplar.port,
    path: config.poplar.path,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};
router.post('/poplar', function (req, res) {
    var client_body = req.body;
    if (req.signedCookies.sessionUserId) {
        client_body.userId = req.signedCookies.sessionUserId;
    }
    var request = http.request(post_poplar_option, function (response) {
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
    request.write(JSON.stringify(client_body));
    request.write('\n');
    request.end();
});
router.post('/dummy/compile', function (req, res) {
    console.log(req);
    var ret = {
        //src: "#include<stdio.h>\n\nint main() {\n\tprintf(\"hello\n\");\n}\n",
        source: "Module.print('hello');",
        message: "",
        error: "Warning: This message is created by mock-up server."
    };
    res.json(ret);
});
router.post('/dummy/poplar', function (req, res) {
});
module.exports = router;
