///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />

/**
 * ユーザ
 * @class User
 * @constructor
 * @param {String} name 名前
 * @param {String} student_number 学籍番号
 */
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
                User.hasMany(models.SubmitStatus);
                User.hasMany(models.Lecture);
            },
            /**
             * ログイン状態の確認
             * @method login
             * @param {Object} cond ユーザの検索条件
             * @param {Function} successCallback ログインしていた場合
             * @param {Function} failureCallback ログインしていない、もしくは何らかのエラーで失敗した場合
             *
             */
            login: (cond, successCallback, failureCallback) => {
                User.find({where: cond}).then(function(user) {
                    if(user) {
                        successCallback(user);
                    } else {
                        failureCallback();
                    }
                }, failureCallback);
            },
            /**
             * 学生リストを取得する
             * 講義ごとの学生リストはまだ取得できない
             * @method getStudentList
             * @param {Number} lectureId 講義番号
             * @param {Function} callback リストの操作
             * @param {Function} failureCallback 失敗時
             */
            getStudentList: (lectureId, callback, failureCallback) => {
                User.findAll({where: {role_admin: false}}).then(callback, failureCallback);
            }
        }
    });
    return User;
};
