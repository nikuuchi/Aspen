///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        name:          DataTypes.STRING,
        github_id:     DataTypes.STRING,
        studentNumber: DataTypes.STRING,
        password:      DataTypes.STRING,
        role_admin:    DataTypes.BOOLEAN,
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
                User.hasMany(models.Subject, { through: models.SubmitStatus });
                User.hasMany(models.Lecture);
            }
        }
    });
    return User;
};
