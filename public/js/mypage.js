///<reference path="../../typings/jquery/jquery_plugins.d.ts" />
$(function () {
    $(".subjectInList").bind("click", function () {
        var subjectId = $(this).attr("id");

        //var userId = $.cookie("userId");
        location.href = "/editor/" + subjectId;
    });
});
