///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />

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
            /** Subject.getStatuses: 全ユーザの提出状況を検索する
              * Seq: Sequelize
              * SubmitStatus: テーブル
              * successCallback: 成功した場合
              * failureCallback: 何らかの原因で失敗した場合
              */
            getStatuses: (Seq, SubmitStatus, successCallback, failureCallback) => {
                Subject.getStatusesByUser(Seq, SubmitStatus, null, successCallback, failureCallback);
            },
            /** Subject.getStatusesByUser: 各ユーザの提出状況を検索する
              * Seq: Sequelize
              * SubmitStatus: テーブル
              * successCallback: 成功した場合
              * failureCallback: 何らかの原因で失敗した場合
              */
            getStatusesByUser: (Seq, SubmitStatus, userId, successCallback, failureCallback) => {
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
                Subject.findAll({
                    include: [SubmitStatus],
                    where: where
                }).then(successCallback, failureCallback);
            }
        }
    });
    return Subject;
};
