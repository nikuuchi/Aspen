var FileManager = (function () {
    function FileManager() {
        this.FTree = [
            { "text": "root", "children": [{ "text": "program.c", "type": "file" }] }
        ];
    }
    FileManager.prototype.constractor = function () {
    };

    FileManager.prototype.setFolder = function (ref, sel, fname) {
        if (!ref.create_node(sel, { text: fname })) {
            alert("Error");
            return false;
        }
        ref.open_node(sel);
        return true;
    };

    FileManager.prototype.setFile = function (ref, sel, fname) {
        if (!ref.create_node(sel, { text: fname, type: 'file' })) {
            alert("Error");
            return false;
        }
        ref.open_node(sel);
        return true;
    };

    FileManager.prototype.getFile = function (path) {
        if (localStorage[path])
            return localStorage[path];
        return false;
    };

    FileManager.prototype.show = function () {
        console.log(this.FTree);
    };
    return FileManager;
})();
