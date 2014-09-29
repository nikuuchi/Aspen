$(function () {
    $(".subjectInList").bind("click", function () {
        var id = $(this).attr("id");
        location.href = "/" + id;
    });
});
