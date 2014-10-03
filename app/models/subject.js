///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
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
            getStatuses: function (Seq, SubmitStatus, userId, successCallback, failureCallback) {
                var lectureId = { LectureId: 1 /* Default */  };
                var eqUserId = { 'SubmitStatuses.UserId': userId };
                var isNullUserId = { 'SubmitStatuses.UserId': null };

                //left outer join
                Subject.findAll({
                    include: [SubmitStatus],
                    where: Seq.and(lectureId, Seq.or(eqUserId, isNullUserId))
                }).then(successCallback, failureCallback);
            }
        }
    });
    return Subject;
};
