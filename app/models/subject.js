///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
var Promise = require('bluebird');

/**
* Subject
* @class Subject
* @constructor
* @param {String} name 課題名
* @param {String} content 内容
* @param {Date} endAt 終了期限
*
*/
module.exports = function (sequelize, DataTypes) {
    var Subject = sequelize.define('Subject', {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        content: DataTypes.TEXT,
        startAt: DataTypes.DATE,
        endAt: DataTypes.DATE,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        deleteFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Subject.hasMany(models.SubmitStatus);
            },
            /**
            * 全ユーザの提出状況を検索する
            * @method getStatuses
            * @param {Object} db DB
            * @param {Number} lectureId 講義番号
            * @return {Promise} Promise
            */
            getStatuses: function (db, lectureId) {
                var isLecture = { LectureId: lectureId };
                return Promise.all([
                    db.User.getStudentList(lectureId),
                    db.Subject.getList(lectureId),
                    db.Subject.findAll({ where: isLecture })
                ]);
            },
            /**
            * 各ユーザの提出状況を検索する
            * @method getStatusesEachUser
            * @param {Object} Seq Sequelize
            * @param {Object} SubmitStatus テーブル
            * @return {Promise} Promise
            */
            getStatusesEachUser: function (Seq, SubmitStatus, userId) {
                var lectureId = { LectureId: 1 /* Default */  };
                var eqUserId = { UserId: userId };

                //left outer join
                return Promise.all([
                    Subject.findAll({ where: lectureId }),
                    SubmitStatus.findAll({ where: eqUserId })
                ]);
            },
            /**
            * 講義ごとの課題一覧を取得する
            * @method getList
            * @param {Number} lecturId 講義id
            * @return {Promise} Promise
            */
            getList: function (lecturId) {
                return Subject.findAll({ where: { LectureId: lecturId } });
            }
        }
    });
    return Subject;
};
