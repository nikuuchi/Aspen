///<reference path='../../typings/jstree/jstree.d.ts'/>
var FileManager = (function () {
    function FileManager() {
        this.FTree = [
            { "text": "root", "children": [{ "text": "program.c", "type": "file" }] }
        ];
    }
    FileManager.prototype.constractor = function () {
    };

    FileManager.prototype.ref = function () {
        return $('#sidebar').jstree(true);
    };

    FileManager.prototype.setFolder = function (sel, fname) {
        if (!this.ref().create_node(sel, { text: fname })) {
            alert("Error");
            return false;
        }
        this.ref().open_node(sel);
        return true;
    };

    FileManager.prototype.setFile = function (selectedPos, fname) {
        if (!this.ref().create_node(selectedPos, { text: fname, type: 'file' })) {
            alert("Error");
            return false;
        }
        this.ref().open_node(selectedPos);
        return true;
    };

    FileManager.prototype.getFile = function (path) {
        if (localStorage[path])
            return localStorage[path];
        return false;
    };

    FileManager.prototype.getSelectedNode = function () {
        var selectedNodes = this.ref().get_selected();
        return selectedNodes[0];
    };

    FileManager.prototype.getCurrentType = function () {
        return this.ref().get_type(this.getSelectedNode());
    };

    FileManager.prototype.getCurrentPath = function () {
        return this.ref().get_path(this.getSelectedNode(), "/");
    };

    FileManager.prototype.show = function () {
        console.log(this.FTree);
    };
    return FileManager;
})();
