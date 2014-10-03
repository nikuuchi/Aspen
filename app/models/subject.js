///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
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
            * @return {Promise} Promise
            */
            getStatuses: function (db) {
                var lecturId = { LectureId: 1 };
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
            getStatusesEachUser: function (Seq, SubmitStatus, userId) {
                var lectureId = { LectureId: 1 /* Default */  };
                var eqUserId = { 'SubmitStatuses.UserId': userId };
                var isNullUserId = { 'SubmitStatuses.UserId': null };

                //left outer join
                return Subject.findAll({
                    include: [SubmitStatus],
                    where: Seq.and(lectureId, Seq.or(eqUserId, isNullUserId))
                });
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
