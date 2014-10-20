$(function() {
  $("input").on("input", function() {
    $("button").attr("disabled", "");
    $("button").addClass("disabled");
    var snum = $("input[name='inputNumber']").val().toUpperCase();
    snum = snum.replace(/^B/,"b");
    $("input[name='inputNumber']").val(snum);
    if(snum.match(/b[0-9]{2}[0-9A-Z].[0-9]{3}$/)) {
      if($("input[name='inputName']").val() !== "") {
        $("button").removeClass("disabled");
        $("button").removeAttr("disabled");
      }
    }
  });

});
