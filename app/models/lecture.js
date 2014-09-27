///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
module.exports = function (sequelize, DataTypes) {
    var Lecture = sequelize.define('Lecture', {
        name: DataTypes.STRING,
        startAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        delereFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Lecture.hasMany(models.User);
            }
        }
    });
    return Lecture;
};
