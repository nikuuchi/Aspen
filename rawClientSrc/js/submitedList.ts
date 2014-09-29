
var studentListFlag = false;
var subjectListFlag = false;

$(function(){

  $(".submitedInList").bind("click", function() {
    var id = $(this).attr("id");
    location.href = "/" + id;
  });

  $(".search-panel-group > span").bind("click", function(){
    var id = $(this).attr("id");
    switch(id){
      case "student":
        if(studentListFlag){
          studentListFlag = false;
          $(this).css("transform", "rotate(0deg)");
        } else {
          studentListFlag = true;
          $(this).css("transform", "rotate(180deg)");
        }
        break;
      case "subject":
        if(subjectListFlag){
          subjectListFlag = false;
          $(this).css("transform", "rotate(0deg)");
        } else {
          subjectListFlag = true;
          $(this).css("transform", "rotate(180deg)");
        }
        break;
    }
    id = "#" + id + "-list";
    console.log(id);
    $(id).slideToggle("fast", function(){
      $(id).css("overflow", "auto");
      });
    });

  $(".search-panel-content").bind("click", function(){
    var id = $(this).attr("id");
    switch(id){
      case "student-content":
        $(".student-head").text($(this).text());
        break;
      case "subject-content":
        $(".subject-head").text($(this).text());
        break;
    }
    });

});
