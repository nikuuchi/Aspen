///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function (req, res) {
    if (req.signedCookies) {
        db.User.find({ where: { github_id: req.signedCookies.sessionUserId } }).then(function (user) {
            console.log(user);
            if (user) {
                //Login
                //ログインユーザの課題提出状況の提示
                //TODO: DBからの読み出し
                var tableHead = ["課題名", "提出状況", "締切"];
                var data = [[0, "function", "未提出", "14/10/11"], [1, "sort", "未提出", "14/10/04"], [2, "fib", "提出済", "14/10/04"]];
                res.render('list', { title: 'Aspen', tableHead: tableHead, data: data });
            } else {
                //Not login
                res.render('top', { title: 'Aspen' });
            }
        }, function (err) {
            res.send(err);
        });
    } else {
        //Not login(初回アクセス?)
        res.render('top', { title: 'Aspen' });
    }
});

router.get('/subject/:file', function (req, res) {
    res.render('editor'); //FIXME
});

router.get('/editor/:name', function (req, res) {
    res.render('editorView'); //TODO use :name
});

router.get('/editor', function (req, res) {
    res.render('editorView');
});

router.get('/user/:userid', function (req, res) {
    res.render('mypage');
});

router.get('/list/all', function (req, res) {
    //TODO DB
    var tableHead = ["学籍番号", "氏名", "課題名", "提出状況", "締切"];
    var data = [[0, 1464183, "田村健介", "sort", "未提出", "14/10/11"]];
    data.push([1, 1464183, "田村健介", "fib", "未提出", "14/10/04"]);
    data.push([2, 1464150, "須藤建", "fib", "未提出", "14/10/04"]);
    data.push([3, 1464184, "田村侑士", "fib", "提出済", "14/10/04"]);
    data.push([4, 1464275, "山口真弥", "fib", "未提出", "14/10/04"]);
    data.push([5, 1464311, "本多峻", "fib", "提出済", "14/10/04"]);
    var students = [];
    students.push([1464183, "田村健介"]);
    students.push([1464150, "須藤建"]);
    students.push([1464184, "田村侑士"]);
    students.push([1464275, "山口真弥"]);
    students.push([1464311, "本多峻"]);
    var subjects = [];
    subjects.push([1, "fib"]);
    subjects.push([2, "sort"]);
    subjects.push([3, "if"]);
    subjects.push([4, "Hello World"]);

    res.render('all', { title: 'Aspen', tableHead: tableHead, data: data, students: students, subjects: subjects });
});

router.get('/subject/:file', function (req, res) {
    res.send('file: ' + req.params.file);
});

router.get('/subject', function (req, res) {
    //TODO Check admin role
    res.render('subject');
});

router.get('/register', function (req, res) {
    res.render('register');
});

module.exports = router;
