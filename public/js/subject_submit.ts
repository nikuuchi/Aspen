///<reference path="../../typings/jquery/jquery.d.ts" />
///<reference path="../../typings/ace/ace.d.ts" />

var editor;
var markdownEditor;
$(function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/xcode");
    editor.getSession().setMode("ace/mode/c_cpp");
    (<any>editor).setFontSize(14);

    markdownEditor = ace.edit("markdownEditor");
    markdownEditor.setTheme("ace/theme/xcode");
    markdownEditor.getSession().setMode("ace/mode/markdown");
    (<any>markdownEditor).setFontSize(14);
});

function createHiddenElement(name, value) {
    var hidden_element = document.createElement("input");
    hidden_element.setAttribute("name", name);
    hidden_element.setAttribute("type", "hidden");
    hidden_element.setAttribute("value", value);
    return hidden_element;
}

function getSubjectId(): Number {
    var pathes = location.pathname.split("/");
    var _subjectId = pathes[pathes.length - 1];
    return (_subjectId == "editor")? 0 : parseInt(_subjectId);
}


function postData() {
    var form = document.getElementById("subject_form");

    var contentElement = createHiddenElement("content", editor.getValue());
    var exampleElement = createHiddenElement("example", markdownEditor.getValue());
    var subjectIdElement = createHiddenElement("subjectId", getSubjectId());


    form.appendChild(contentElement);
    form.appendChild(exampleElement);
    form.appendChild(subjectIdElement);
    (<any>form).submit();
}
