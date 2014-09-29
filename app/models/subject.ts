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
                Subject.hasMany(models.User, { through: models.SubmitStatus });
            }
        }
    });
    return Subject;
};
