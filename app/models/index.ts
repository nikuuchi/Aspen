///<reference path="../../typings/express/express.d.ts" />
///<reference path="../../typings/node/node.d.ts" />
///<reference path="../../typings/lodash/lodash.d.ts" />

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');
var config = require('config');

var sequelize = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        {
            dialect: 'mysql',
            port: 3306
        }
);
var db = <any>{};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.match(/(js)$/)) && (file !== 'index.js')
    })
    .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
