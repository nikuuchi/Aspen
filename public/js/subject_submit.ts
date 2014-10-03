///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/ace/ace.d.ts" />

var editor;
$(function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/c_cpp");
    (<any>editor).setFontSize(14);
});

function postData() {
    var form = document.getElementById("subject_form");
    var hidden_element = document.createElement("input");
    hidden_element.setAttribute("name", "content");
    hidden_element.setAttribute("type", "hidden");
    hidden_element.setAttribute("value", editor.getValue());
    form.appendChild(hidden_element);
    (<any>form).submit();
}
