/// <reference path="FileManager.ts"/>

var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/c_cpp");

var selectedNode;

$(function() {
  var fm = new FileManager();

  $('#sidebar').jstree({
  'core': {
    'check_callback' : true,
    "data": fm.FTree
  },
  "types" : {
    "default" : {
      "icon" : "glyphicon glyphicon-folder-open"
    },
    "file" : {
      "icon" : "glyphicon glyphicon-file",
      "valid_children" : []
    }
  },
    "plugins": ["types", "unique", "sort", "wholerow"]
  });

  var ref = $('#sidebar').jstree(true);
  $('#sidebar').on("changed.jstree", function (e, data) {
    selectedNode = ref.get_selected()[0];
    console.log(selectedNode);
    fm.getFile(selectedNode);

  });

  $('.add-file-btn').click(function() {
    var fname = $(".file-name-input").val();
    if(!fname) {
      alert("ファイル名を入力してください");
      return false;
    }
    if(!selectedNode) {
      alert("追加するフォルダを選択してください");
      return false;
    }
    if(fm.setFile(ref, selectedNode, fname)) $(".file-name-input").val("");

  });

  $('.add-folder-btn').click(function() {
    var fname = $(".foldeer-name-input").val();
    if(!fname) {
      alert("フォルダ名を入力してください");
      return false;
    }
    if(!selectedNode) {
      alert("追加するフォルダを選択してください");
      return false;
    }
    if(fm.setFolder(ref, selectedNode, fname)) $(".foldeer-name-input").val("");

  });

  var sbFlag = false;
  var editorW = $('#editor').css("width");
  $('.sidebar-btn').click(function() {
    if(!sbFlag) {
      $('.sidebar').css("opacity", "1");
      var sidebarW = $('.sidebar').width();
      $('.sidebar').css("left", "0");
      $('.sidebar-btn').css("margin-left", sidebarW + "px");
      $('.editor-view').css("margin-left", sidebarW + "px");
      $('.btnglyph').css("transform","rotate(180deg)");

      $('#editor').css("width", function(index, value) {
        console.log(index,value);
        var re = new RegExp("[0-9]+");
        var num = re.exec(value);
        var w = re.exec(sidebarW);
        num = num[0] - w[0];
        sbFlag = true;
        return num + "px";
      });
    } else {
      $('.sidebar').css("left", "-300px");
      $('.sidebar-btn').css("margin-left", "0");
      $('.editor-view').css("margin-left", "0");
      $('.btnglyph').css("transform","rotate(0deg)");
      $('#editor').css("width", editorW);
      $('.sidebar').css("opacity", "0");
      sbFlag = false;
    }
  });

});
