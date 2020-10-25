"use strict";

const commentsData = {
    counter: 0,
};

function clearInput(e) {
    if ($(e.target).prop("tagName") == "INPUT") $(e.target).val("");
}

function insertComment() {
    const $oldHtml = $("#user_comments").html();
    const $template = $("#template_comment").html();

    ++commentsData.counter;
    const $newComment = $template
        .replace("{{name}}", $("#input_name").val())
        .replace("{{comment}}", $("#input_comment").val())
        .replace("{{date}}", moment().format("D/MM/YYYY, HH:mm:ss"))
        .replace("{{index}}", "comment_0" + commentsData.counter);
    $("#user_comments").html($oldHtml + $newComment);
    $("#user_comments")[0].lastElementChild.scrollIntoView({
        behavior: "smooth",
    });
}

function deleteComment(e) {
    if ($(e.target).hasClass("btn-delete")) {
        const $comment = $(e.target).parent();
        $comment.slideUp(300);
        setTimeout(() => $comment.remove(), 300);
    }
}

function editComment(e) {
    if ($(e.target).hasClass("btn-edit")) {
        $(".modal-wrapper").slideDown(200);
        $(".modal-name").val($(e.target).parent().children(".user_name")
            .text());
        $(".modal-comment").val($(e.target).parent().children(".user_comment")
            .text());
        $(".modal-ok").one("click", () => {
            const dateNow = moment().format("D/MM/YYYY, HH:mm:ss");
            $(e.target)
                .parent()
                .children(".user_name")
                .text($(".modal-name")
                    .val());
            $(e.target)
            .parent()
            .children(".user_comment")
            .text($(".modal-comment").val());
            $(".modal-wrapper").slideUp(200);
            $(e.target)
            .parent()
            .children(".date")
            .text(dateNow);
            $(e.target)
            .parent()
            .children(".hidden")
            .attr("class", "edited");
        });
    }
}

$(".submit").on("click", insertComment);
$("#input_area").on("keydown", (e) => {
    switch (e.which) {
    case 13:
        insertComment();
        break;
    case 27:
        clearInput(e);
        break;
    }
});

$(document)
    .on("click", clearInput)
    .on("click", deleteComment)
    .on("click", editComment);
$(".modal-cancel").on("click", () => $(".modal-wrapper").slideUp(200));