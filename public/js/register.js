$(function() {
  $("input").on("input", function() {
    $("button").attr("disabled", "");
    $("button").addClass("disabled");
    var snum = $("input[name='inputNumber']").val().toLowerCase();
    snum = snum.replace(/^B/,"b");
    if(snum.match(/b[0-9]{2}[0-9a-z].[0-9]{3}$/)) {
      $("input[name='inputNumber']").val(snum);
      if($("input[name='inputName']").val() !== "") {
        $("button").removeClass("disabled");
        $("button").removeAttr("disabled");
      }
    }
  });

});
