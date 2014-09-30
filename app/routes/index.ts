///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>

var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
    if(req.signedCookies) {
        db.User.find({where: {github_id: req.signedCookies.sessionUserId}}).then(function(user) {
            console.log(user);
            if(user) {
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
        }, function(err){
            res.send(err);
        });
    } else {
        //Not login(初回アクセス?)
        res.render('top', { title: 'Aspen' });
    }
});

router.get('/subject/:file', function(req, res) {
    res.render('editor'); //FIXME
});

router.get('/subject/:file', function(req, res) {
    res.send('user:' + req.params.userid + ', subject:' + req.params.file);
});

router.get('/editor', function(req, res) {
    res.render('editorView');
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

router.get('/register', function(req, res) {
    res.render('register');
});


module.exports = router;
