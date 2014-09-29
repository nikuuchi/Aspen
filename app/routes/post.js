///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/express/express.d.ts'/>
var db = require('../models');

function editor(req, res) {
    res.send("helo");
}
exports.editor = editor;
