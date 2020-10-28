"use strict";


let commentsData = {
    counter: 0,
};

function clearInput(e) {
    if ($(e.target).prop("tagName") == "INPUT") $(e.target).val("");
}

function animateSubmit(correct) {
    const $color = $("#bullet");
    if (correct) {
        $color.css("box-shadow", "0 0 20px 10px rgb(0, 255, 42)");
    } else {
        $color.css("box-shadow", "0 0 20px 20px rgb(255, 0, 0)");
    }
    $color.animate({
        opacity: 0,
        width: "+=44444",
    }, 600);
    $color.animate({
        opacity: 1,
        width: "-=44444",
    }, 0);
}

function insertComment() {

    const $oldHtml = $("#user_comments").html();
    const $template = $("#template_comment").html();
    if (validateInput()) {
        animateSubmit(true);
        ++commentsData.counter;
        const $newComment = $template
            .replace("{{name}}", formatName($("#input_name").val()))
            .replace("{{comment}}", formatComment($("#input_comment").val()))
            .replace("{{date}}", moment().format("D/MM/YYYY, HH:mm:ss"))
            .replace("{{index}}", "comment_0" + commentsData.counter);

        $("#user_comments").html($oldHtml + $newComment);
        $("#user_comments")[0].lastElementChild.scrollIntoView({
            behavior: "smooth",
        });
        commentsData["comment_0" + commentsData.counter] = {
            name: formatName($("#input_name").val()),
            comment: formatComment($("#input_comment").val()),
            date: moment().format("D/MM/YYYY, HH:mm:ss"),
            edited: false,
            index: "comment_0" + commentsData.counter,
        };
    }
}

function deleteComment(e) {
    if ($(e.target).hasClass("btn-delete")) {
        const $commentID = $(e.target).parent().attr("data-index");
        const $comment = $(e.target).parent();
        $comment.slideUp(300);
        setTimeout(() => $comment.remove(), 300);
        delete commentsData[$commentID];
    }
}

function editComment(e) {
    $(".modal-cancel").on("click", () => $(".modal-wrapper").slideUp(200));
    if ($(e.target).hasClass("btn-edit")) {
        const $commentID = $(e.target).parent().attr("data-index");
        $(".modal-wrapper").slideDown(200);
        $(".modal-name").val($(e.target).parent().children(".user_name")
            .text());
        $(".modal-comment").val($(e.target).parent().children(".user_comment")
            .text());
        $(".modal-ok").off("click").on("click", () => {
            if ($(".modal-name").val() !== $(e.target).parent()
                .children(".user_name").text() || $(".modal-comment")
                .val() !== $(e.target).parent().children(
                    ".user_comment").text()) {

                if (validateInput()) {
                    $(".modal-ok").off();
                    const dateNow = moment().format(
                        "D/MM/YYYY, HH:mm:ss");
                    $(e.target)
                        .parent()
                        .children(".user_name")
                        .text($(".modal-name")
                            .val());
                    $(e.target)
                        .parent()
                        .children(".user_comment")
                        .text($(".modal-comment").val());
                    $(e.target)
                        .parent()
                        .children(".date")
                        .text(dateNow);
                    $(e.target)
                        .parent()
                        .children(".hidden")
                        .attr("class", "edited");
                    $(".modal-wrapper").slideUp(200);
                    commentsData[$commentID].name = $(".modal-name")
                        .val();
                    commentsData[$commentID].comment = $(
                        ".modal-comment").val();
                    commentsData[$commentID].date = dateNow;
                    commentsData[$commentID].edited = true;
                }
            }
        });
    }
}

function errorWarning() {
    $(".modal-error").fadeIn(300).delay(1000).fadeOut(500);
}

function validateInput() {
    let $name;
    let $comment;
    const $errorWindow = $(".modal-error");
    const $modal = $(".modal-wrapper").css("display");
    if ($modal == "block") {
        $name = $(".modal-name").val().trim();
        $comment = $(".modal-comment").val().trim();
    }
    if ($modal != "block") {
        $name = $("#input_name").val().trim();
        $comment = $("#input_comment").val().trim();
    }
    if (!$name) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text("Error: Please enter your name");
        return;
    } else if ($name.length < 3) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text("Error: Name length must be at least 3 symbols");
    } else if ($name.length > 50) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text("Error: Name length must be less than 50 symbols");
    } else if (!$comment) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text("Error:  Please input comment");
    } else if ($comment.length < 2) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text("Error: Comment should have at least 2 symbols");
    } else if ($comment.length > 300) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text(
            "Error: Comment maximum length must be less than 300 symbols");
    } else return true;
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

const observer = new MutationObserver(() => {
    const jsonObj = JSON.stringify(commentsData);
    localStorage.setItem("comments", jsonObj);
});


function build() {
    if (localStorage.getItem("comments")) {
        commentsData = JSON.parse(localStorage.getItem("comments"));
    }
    getValues(commentsData);

    function getValues(object) {

        const $template = $("#template_comment").html();
        for (let key in object) {
            if (typeof object[key] === "object") {
                const $oldHtml = $("#user_comments").html();
                const name = object[key].name;
                const comment = object[key].comment;
                const date = object[key].date;
                const edited = object[key].edited;
                const index = object[key].index;
                ++commentsData.counter;
                const $newComment = $template
                    .replace("{{name}}", name)
                    .replace("{{comment}}", comment)
                    .replace("{{date}}", date)
                    .replace("{{index}}", index);
                $("#user_comments").html($oldHtml + $newComment);
                if (edited) {
                    const $comment = $(`[data-index=${index}]`)
                        .children(".hidden");
                    $comment.attr("class", "edited");
                }
                getValues(object[key]);
            }
        }
    }
}

observer.observe(document, {
    subtree: true,
    childList: true,
});
window.onload = build();

function formatComment(commentText) {
    const findLink =
        /\b(?<protocol>https?:\/\/)(?<domain>\w{1,63}\.[^\s/.:,]{1,63}(\.[^\s/.:,]{2,63})?(\.[^\s/.:,]{2,63})?)(?<port>\:\d{1,5})?(?<path>\/[\w\/]+(\.(\w{1,8}))?)?\b/mig;
    const findHtml =
        /(<!?\s*[a-z]+\s*.*[0-9]?>).*\n?(<\/\s*[a-z]+\s*[0-9]?>)/mig;
    const findBoldText = /(\*\*)([\p{L}\p{N}]+)(\*\*)/gmiu;
    const findStrikeTroughText = /(--)([\p{L}\p{N}]+)(--)/gmiu;
    const findItalicText = /(__)([\p{L}\p{N}]+)(__)/gmiu;
    const formatedComment = commentText.replace(findHtml, "*HTML NOT PERMITED")
        .replace(findLink, '<a href="$&" class="user-link">$&</a>')
        .replace(findBoldText, "<strong>$2</strong>")
        .replace(findStrikeTroughText, "<s>$2</s>")
        .replace(findItalicText, "<i>$2</i>");
    return formatedComment;
}

function formatName(nameText) {
    const checkName = /^([A-Z][a-z]+\s?){1,3}$/;
    if (nameText.match(checkName)) return nameText;
    else {
        alert("wrong name!");
        nameText = "Enter valid name such as Max Maximov";
        return nameText;
}
}
