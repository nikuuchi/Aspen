///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/ace/ace.d.ts" />
var editor;
$(function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/c_cpp");

    //(<any>editor).setFontSize(14);
    function postData(data) {
    }
});
