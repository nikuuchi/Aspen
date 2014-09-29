///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
module.exports = function (sequelize, DataTypes) {
    var SubmitStatus = sequelize.define('SubmitStatus', {
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        content: DataTypes.TEXT,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        deleteFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {});
    return SubmitStatus;
};
