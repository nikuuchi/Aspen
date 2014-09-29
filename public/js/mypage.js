$(function () {
    $(".subjectInList").bind("click", function () {
        var subjectId = $(this).attr("id");
        var userId = "dammy";
        location.href = "user/" + userId + "/editor/" + subjectId;
    });
});
