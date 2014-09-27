///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
module.exports = function (sequelize, DataTypes) {
    var Subject = sequelize.define('Subject', {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        content: DataTypes.TEXT,
        dueDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        createdAt: {
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
                Subject.hasMany(models.User, { through: models.SubmitStatus });
            }
        }
    });
    return Subject;
};
