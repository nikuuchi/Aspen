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
module.exports = (sequelize, DataTypes) => {
    var Subject = sequelize.define('Subject', {
        name:    DataTypes.STRING,
        url:     DataTypes.STRING,
        content: DataTypes.TEXT,
        startAt: DataTypes.DATE,
        endAt:   DataTypes.DATE,
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
            associate: (models) => {
                Subject.hasMany(models.SubmitStatus);
            },
            /**
             * 全ユーザの提出状況を検索する
             * @method getStatuses
             * @param {Object} db DB
             * @return {Promise} Promise
             */
            getStatuses: (db) => {
                var lecturId = {LectureId: 1};
                return Subject.findAll({
                        include: [{
                            model: db.SubmitStatus,
                            include: [db.User]
                        }]
                });
            },
            /**
             * 各ユーザの提出状況を検索する
             * @method getStatusesEachUser
             * @param {Object} Seq Sequelize
             * @param {Object} SubmitStatus テーブル
             * @return {Promise} Promise
             */
            getStatusesEachUser: (Seq, SubmitStatus, userId) => {
                var lectureId = { LectureId: 1 /* Default */};
                var eqUserId =  { UserId: userId};
                //left outer join
                return Promise.all([
                        Subject.findAll({where: lectureId}),
                        SubmitStatus.findAll({where: eqUserId})
                ]);
            },
            /**
             * 講義ごとの課題一覧を取得する
             * @method getList
             * @param {Number} lecturId 講義id
             * @return {Promise} Promise
             */
            getList: (lecturId: number) => {
                return Subject.findAll({where : {LectureId: lecturId}});
            }
        }
    });
    return Subject;
};
