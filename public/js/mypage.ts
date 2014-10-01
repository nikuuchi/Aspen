///<reference path="../../typings/jquery/jquery_plugins.d.ts" />

var today: Date = new Date();
var oneDay = 86400000;

$(function(){
  $(".subjectInList").bind("click", function() {
    var subjectId = $(this).attr("id");
    location.href = "/editor/" + subjectId;
  });
});

function CreateDataElement(data){
  var result = data;
  var period = data.endAt.getTime() - today.getTime();
  period = period / oneDay;

  switch(data.status) {
    case 0:
      if(period < 7){
        result.cl = "subjectInList notyet-danger";
      } else {
        result.cl = "subjectInList notyet-margin";
      }
      result.status = "未提出";
      break;
    case 1:
      result.cl = "subjectInList submitted";
      result.status = "提出済";
      break;
    case 2:
      result.cl = "subjectInList succeed";
      result.status = "合格";
      break;
  }

  result.endAt = data.endAt.getYear() + "/" + data.endAt.getMonth() + "/" + data.endAt.getDate();

  console.log(result);

  return result;
}
