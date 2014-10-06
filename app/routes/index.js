///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');
var auth = require('../helper/auth');
var Promise = require('bluebird');
var config = require('config');

var tableHead = ["課題名", "提出状況", "締切"];

/* GET home page. */
router.get('/', function (req, res) {
    if (!auth.isLogin(req)) {
        res.render('top', { basePath: config.base.path });
        return;
    }

    db.User.login({ github_id: req.signedCookies.sessionUserId }).then(function (user) {
        if (user == null) {
            throw 'no login';
        }
        return db.Subject.getStatusesEachUser(db.Sequelize, db.SubmitStatus, user.id);
    }).then(function (subjects) {
        var submits = subjects.map(function (subject) {
            return createSubmitView(subject);
        });
        res.render('list', { tableHead: tableHead, submits: submits, basePath: config.base.path });
    }).catch(function (err) {
        console.log(err);
        res.render('top', { basePath: config.base.path });
    });
});

router.get('/subject/:file', function (req, res) {
    //TODO アクセス制限
    //作成した課題自体の編集を行う
    res.render('subject'); //FIXME
});

router.get('/editor/:name', function (req, res) {
    if (!auth.isLogin(req)) {
        res.redirect(config.base.path + '/');
        return;
    }
    db.User.find({ where: { github_id: req.signedCookies.sessionUserId } }).then(function (user) {
        return db.SubmitStatus.find({ where: db.Sequelize.and({ UserId: user.id }, { SubjectId: req.params.name }) });
    }).then(function (status) {
        if (status) {
            res.render('editorView', { has_content: true, content: status.content, basePath: config.base.path });
        } else {
            return db.Subject.find({ where: { id: req.params.name } });
        }
    }).then(function (subject) {
        res.render('editorView', { has_content: true, content: subject.content, basePath: config.base.path });
    }).catch(function (err) {
        console.log(err);
    });
});

router.get('/editor', function (req, res) {
    res.render('editorView', { has_content: false, basePath: config.base.path });
});

router.get('/user/:userid', function (req, res) {
    //TODO アクセス制限
    res.render('list', { basePath: config.base.path });
});

router.get('/list/all', function (req, res) {
    //TODO DB
    var tableHead = ["学籍番号", "氏名", "課題名", "提出状況", "締切"];
    var lectureId = 1;
    Promise.all([
        db.User.getStudentList(lectureId),
        db.Subject.getList(lectureId),
        db.Subject.getStatuses(db)
    ]).then(function (values) {
        var students = values[0].map(function (student) {
            return [student.studentNumber, student.name];
        });
        var subjects = values[1].map(function (subject) {
            return [subject.id, subject.name];
        });
        var submits = values[2].map(function (subject) {
            return createAllSubmitView(subject);
        });

        res.render('all', {
            tableHead: tableHead,
            submits: submits,
            students: students,
            subjects: subjects,
            basePath: config.base.path
        });
    });
});

router.get('/subject', function (req, res) {
    //TODO Check admin role
    res.render('subject', { basePath: config.base.path });
});

router.get('/register', function (req, res) {
    //TODO アクセス制限
    res.render('register', { basePath: config.base.path });
});

function formatEndAt(endAt) {
    return (+endAt.getFullYear() - 2000) + "/" + ((+endAt.getMonth() < 9) ? "0" : "") + (+endAt.getMonth() + 1) + "/" + ((+endAt.getDate() < 10) ? "0" : "") + endAt.getDate();
}

var statusClasses = ["status-notyet-margin", "status-submitted", "status-success"];
var statusClosingClasses = ["status-closing-notyet", "status-closing-submitted", "status-closing-success"];

function chooseClass(status, remainingDays) {
    if (remainingDays > 0) {
        if (remainingDays < 7 && status == 0) {
            return "status-notyet-danger";
        }
        return statusClasses[status];
    } else {
        return statusClosingClasses[status];
    }
}

var statusArray = ["未提出", "提出済", "合格"];
var oneDay = 86400000;

function createAllSubmitView(subject) {
    var today = new Date();
    var remainingDays = (subject.endAt - today) / oneDay;
    var status = 0;
    var student_name = '';
    var student_number = '';
    console.log(subject);
    if (subject.SubmitStatuses[0]) {
        student_name = subject.SubmitStatuses[0].User.name;
        student_number = subject.SubmitStatuses[0].User.studentNumber;
        status = subject.SubmitStatuses[0].status ? subject.SubmitStatuses[0].status : 0;
    }
    return {
        id: subject.id,
        student_name: student_name,
        student_number: student_number,
        subject_name: subject.name,
        status: statusArray[status],
        endAt: formatEndAt(subject.endAt),
        endAtTime: subject.endAt.getTime(),
        cl: chooseClass(status, remainingDays)
    };
}

function createSubmitView(subject) {
    var today = new Date();
    var remainingDays = (subject.endAt - today) / oneDay;
    var status = 0;
    if (subject.SubmitStatuses[0]) {
        status = subject.SubmitStatuses[0].status ? subject.SubmitStatuses[0].status : 0;
    }
    return {
        id: subject.id,
        name: subject.name,
        status: statusArray[status],
        endAt: formatEndAt(subject.endAt),
        endAtTime: subject.endAt.getTime(),
        cl: chooseClass(status, remainingDays)
    };
}

module.exports = router;
