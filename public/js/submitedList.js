var studentListFlag = false;
var subjectListFlag = false;

$(function () {
    $(".submitedInList").bind("click", function () {
        var id = $(this).attr("id");
        location.href = "/" + id;
    });

    $(".search-panel-group > span").bind("click", function () {
        var id = $(this).attr("id");
        SearchPanelAction(id);
    });

    $(".search-panel-content").bind("click", function () {
        var id = $(this).attr("id");
        switch (id) {
            case "student-content":
                $(".student-head").text($(this).text());
                break;
            case "subject-content":
                $(".subject-head").text($(this).text());
                break;
        }
        console.log(id);
        var splitId = id.split("-");
        id = splitId[0];

        SearchPanelAction(id);
    });
});

function SearchPanelAction(id) {
    switch (id) {
        case "student":
            if (studentListFlag) {
                studentListFlag = false;
                $("span[id='student']").css("transform", "rotate(0deg)");
                $(".student-head").css("margin-bottom", "0px");
            } else {
                studentListFlag = true;
                $("span[id='student']").css("transform", "rotate(180deg)");
                $(".student-head").css("margin-bottom", "15px");
            }
            break;
        case "subject":
            if (subjectListFlag) {
                subjectListFlag = false;
                $("span[id='subject']").css("transform", "rotate(0deg)");
                $(".subject-head").css("margin-bottom", "0px");
            } else {
                subjectListFlag = true;
                $("span[id='subject']").css("transform", "rotate(180deg)");
                $(".subject-head").css("margin-bottom", "15px");
            }
            break;
    }

    id = "#" + id + "-list";
    console.log(id);
    $(id).slideToggle("fast", function () {
        $(id).css("overflow", "auto");
    });
}

function ChangeListElements() {
}
