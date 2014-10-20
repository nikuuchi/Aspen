$(function() {
  $("input").on("input", function() {
    $("button").attr("disabled", "");
    $("button").addClass("disabled");
    if($("input[name='inputNumber']").val().match(/b[0-9]{7}$/)) {
      if($("input[name='inputName']").val() !== "") {
        $("button").removeClass("disabled");
        $("button").removeAttr("disabled");
      }
    }
  });

});
