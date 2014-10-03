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
              var datas = new Array();
                db.User.findAll({where: {id: user.id}, include: {model: db.Subject, required: true}}).then(function(subjects){
                  console.log(subjects);
                  subjects.forEach((subject) => {
                    datas.push({
                      "id": subject.SubjectId,
                      "name": subject.name,
                      "status": subject.status,
                      "endAt": subject.endAt
                    });
                  });
                  datas = convertSubmitsForView(datas);
                  res.render('list', { title: 'Aspen', tableHead: tableHead, datas: datas });
                });
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

    submits = convertSubmitsForView(submits);

    res.render('all', {title: 'Aspen', tableHead: tableHead, submits: submits, students: students, subjects: subjects});
});

router.get('/subject', function(req, res) {
    //TODO Check admin role
    res.render('subject');
});

router.get('/register', function(req, res) {
    //TODO アクセス制限
    res.render('register');
});



function convertSubmitsForView(submits){
  var today = new Date();
  var oneDay = 86400000;
  var period;

  submits.forEach((submit) => {
    period = submit.endAt.getTime() - today.getTime();
    period = period / oneDay;
    if(submit.endAt.getTime() > today.getTime()){
      switch(submit.status){
        case 0:
          if(period < 7){
            submit.cl = "status-notyet-danger";
          } else {
            submit.cl = "status-notyet-margin";
          }
          submit.status = "未提出";
          break;
        case 1:
          submit.cl = "status-submited";
          submit.status = "提出済";
          break;
        case 2:
          submit.cl = "status-success";
          submit.status = "合格";
          break;
      }
    } else {
      switch(submit.status){
        case 0:
          submit.cl = "status-closing-notyet";
          submit.status = "未提出";
          break;
        case 1:
          submit.cl = "status-closing-submited";
          submit.status = "提出済";
          break;
        case 2:
          submit.cl = "status-closing-success";
          submit.status = "合格";
          break;
      }
    }
    submit.endAtTime = submit.endAt.getTime();
    submit.endAt =  (+submit.endAt.getFullYear() - 2000) + "/" + ((+submit.endAt.getMonth() < 9)? "0" : "") + (+submit.endAt.getMonth() + 1) + "/" + ((+submit.endAt.getDate() < 10)? "0" : "") + submit.endAt.getDate();
  });
  return submits;
}

module.exports = router;
