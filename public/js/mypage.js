///<reference path="../../typings/jquery/jquery_plugins.d.ts" />
$(function () {
    $(".subjectInList").bind("click", function () {
        var subjectId = $(this).attr("id");
        location.href = "/editor/" + subjectId;
    });
});
