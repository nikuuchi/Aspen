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
             * @param {Object} Seq Sequelize
             * @param {Object} SubmitStatus テーブル
             */
            getStatuses: (Seq, SubmitStatus) => {
                return Subject.getStatusesByUser(Seq, SubmitStatus, null);
            },
            /**
             * 各ユーザの提出状況を検索する
             * @method getStatusesEachUser
             * @param {Object} Seq Sequelize
             * @param {Object} SubmitStatus テーブル
             */
            getStatusesEachUser: (Seq, SubmitStatus, userId) => {
                var lectureId = { LectureId: 1 /* Default */};
                var eqUserId = {'SubmitStatuses.UserId': userId};
                var isNullUserId = {'SubmitStatuses.UserId': null};
                var where;
                if(userId) {
                    where = Seq.and(lectureId, Seq.or(eqUserId, isNullUserId));
                } else {
                    where = Seq.and(lectureId);
                }
                //left outer join
                return Subject.findAll({
                    include: [SubmitStatus],
                    where: where
                });
            }
        }
    });
    return Subject;
};
