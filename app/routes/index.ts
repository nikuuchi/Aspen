///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>

var express = require('express');
var router = express.Router();
var db = require('../models');
var auth = require('../helper/auth');

var tableHead = ["課題名", "提出状況", "締切"];
/* GET home page. */
router.get('/', function(req, res) {
    if(!auth.isLogin(req)) {
        res.render('top');
        return;
    }
    var failureCallback = () => res.render('top');

    db.User.login(
        {github_id: req.signedCookies.sessionUserId},
        function(user) {
            var Seq = (<any>db).Sequelize;
            db.Subject.getStatuses(Seq, db.SubmitStatus, user.id,
                function(subjects) {
                    var submits = [];
                    subjects.forEach((subject) => {
                        submits.push(createSubmitView(subject));
                    });
                    res.render('list', { tableHead: tableHead, submits: submits });
                },
                failureCallback
            );
        },
        failureCallback
    );
});

router.get('/subject/:file', function(req, res) {
    //TODO アクセス制限
    //作成した課題自体の編集を行う
    res.render('subject'); //FIXME
});

router.get('/editor/:name', function(req, res) {
    //TODO アクセス制限
    res.render('editorView'); //TODO use :name
});

router.get('/editor', function(req, res) {
    res.render('editorView');
});


router.get('/user/:userid', function(req, res) {
    //TODO アクセス制限
    res.render('list');
});

router.get('/list/all', function(req, res) {
    //TODO DB
    var tableHead = ["学籍番号", "氏名", "課題名", "提出状況", "締切"];
    var submits = new Array();
    submits.push({
      "subject_id": 3, "student_number": 1464150, "student_name": "須藤建", "subject_name": "sort", "status": 0, "endAt": new Date("10/21/2014")
      });
    submits.push({
      "subject_id": 3, "student_number": 1464183, "student_name": "田村健介", "subject_name": "sort", "status": 0, "endAt": new Date("10/21/2014")
      });
    submits.push({
      "subject_id": 3, "student_number": 1464184, "student_name": "田村侑士", "subject_name": "sort", "status": 1, "endAt": new Date("10/21/2014")
      });
    submits.push({
      "subject_id": 3, "student_number": 1464275, "student_name": "山口真弥", "subject_name": "sort", "status": 0, "endAt": new Date("10/21/2014")
      });
    submits.push({
      "subject_id": 3, "student_number": 1464311, "student_name": "本多峻", "subject_name": "sort", "status": 2, "endAt": new Date("10/21/2014")
      });
    submits.push({
      "subject_id": 2, "student_number": 1464150, "student_name": "須藤建", "subject_name": "fib", "status": 2, "endAt": new Date("10/7/2014")
      });
    submits.push({
      "subject_id": 2, "student_number": 1464183, "student_name": "田村健介", "subject_name": "fib", "status": 1, "endAt": new Date("10/7/2014")
      });
    submits.push({
      "subject_id": 2, "student_number": 1464184, "student_name": "田村侑士", "subject_name": "fib", "status": 0, "endAt": new Date("10/7/2014")
      });
    submits.push({
      "subject_id": 2, "student_number": 1464275, "student_name": "山口真弥", "subject_name": "fib", "status": 0, "endAt": new Date("10/7/2014")
      });
    submits.push({
      "subject_id": 2, "student_number": 1464311, "student_name": "本多峻", "subject_name": "fib", "status": 1, "endAt": new Date("10/7/2014")
      });
    submits.push({
      "subject_id": 1, "student_number": 1464150, "student_name": "須藤建", "subject_name": "Hello World", "status": 1, "endAt": new Date("9/27/2014")
      });
    submits.push({
      "subject_id": 1, "student_number": 1464183, "student_name": "田村健介", "subject_name": "Hello World", "status": 0, "endAt": new Date("9/27/2014")
      });
    submits.push({
      "subject_id": 1, "student_number": 1464184, "student_name": "田村侑士", "subject_name": "Hello World", "status": 2, "endAt": new Date("9/27/2014")
      });
    submits.push({
      "subject_id": 1, "student_number": 1464275, "student_name": "山口真弥", "subject_name": "Hello World", "status": 1, "endAt": new Date("9/27/2014")
      });
    submits.push({
      "subject_id": 1, "student_number": 1464311, "student_name": "本多峻", "subject_name": "Hello World", "status": 0, "endAt": new Date("9/27/2014")
      });
    var students = [];
    students.push([1464183, "田村健介"]);
    students.push([1464150, "須藤建"]);
    students.push([1464184, "田村侑士"]);
    students.push([1464275, "山口真弥"]);
    students.push([1464311, "本多峻"]);
    var subjects = [];
    subjects.push([1, "Hello World"]);
    subjects.push([2, "fib"]);
    subjects.push([3, "sort"]);
    subjects.push([4, "if"]);

    //submits = convertSubmitsForView(submits);

    res.render('all', {tableHead: tableHead, submits: submits, students: students, subjects: subjects});
});

router.get('/subject', function(req, res) {
    //TODO Check admin role
    res.render('subject');
});

router.get('/register', function(req, res) {
    //TODO アクセス制限
    res.render('register');
});


function formatEndAt(endAt) {
    return (+endAt.getFullYear() - 2000) + "/" + ((+endAt.getMonth() < 9)? "0" : "") + (+endAt.getMonth() + 1) + "/" + ((+endAt.getDate() < 10)? "0" : "") + endAt.getDate();
}

var statusClasses        = ["status-notyet-margin",  "status-submitted",         "status-success"];
var statusClosingClasses = ["status-closing-notyet", "status-closing-submitted", "status-closing-success"];

function chooseClass(status, remainingDays) {
    if(remainingDays > 0) {
        if(remainingDays < 7 && status == 0) {
            return "status-notyet-danger";
        }
        return statusClasses[status];
    } else {
        return statusClosingClasses[status];
    }
}

var statusArray = ["未提出", "提出済", "合格"];
var oneDay = 86400000;

function createSubmitView(subject) {
    var today = new Date();
    var remainingDays = ((<any>subject.endAt) - (<any>today)) / oneDay;
    console.log(remainingDays);
    var status = subject.SubmitStatuses.status? subject.SubmitStatuses.status : 0;
    return {
        id: subject.id,
        name: subject.name,
        status: statusArray[status],
        endAt: formatEndAt(subject.endAt),
        endAtTime: subject.endAt.getTime(),
        cl: chooseClass(status, remainingDays),
    }
}

module.exports = router;
