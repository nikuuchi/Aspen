///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />

module.exports = (sequelize, DataTypes) => {
    var Lecture = sequelize.define('Lecture', {
        name: DataTypes.STRING,
        startAt: {
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
                Lecture.hasMany(models.User);
            }
        }
    });
    return Lecture;
};
