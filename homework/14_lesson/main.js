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
            .replace("{{name}}", $("#input_name").val())
            .replace("{{comment}}", $("#input_comment").val())
            .replace("{{date}}", moment().format("D/MM/YYYY, HH:mm:ss"))
            .replace("{{index}}", "comment_0" + commentsData.counter);

        $("#user_comments").html($oldHtml + $newComment);
        $("#user_comments")[0].lastElementChild.scrollIntoView({
            behavior: "smooth",
        });
        commentsData["comment_0" + commentsData.counter] = {
            name: $("#input_name").val(),
            comment: $("#input_comment").val(),
            date: moment().format("D/MM/YYYY, HH:mm:ss"),
            edited: false,
            index: "comment_0" + commentsData.counter,
        };
        $("#input_comment").val("");
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
                    const commentValue = formatComment($(
                        ".modal-comment").val());
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
                        .html(commentValue);
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
                    commentsData[$commentID].comment = commentValue;
                    commentsData[$commentID].date = dateNow;
                    commentsData[$commentID].edited = true;
                    $("#input_comment").val("");
                }
            }
        });
    }
}

function errorWarning() {
    $(".modal-error").fadeIn(300).delay(2500).fadeOut(500);
}

function formatComment(commentText) {
    const findLink =
        /\b(?<protocol>https?:\/\/)(?<domain>\w{1,63}\.[^\s/.:,]{1,63}(\.[^\s/.:,]{2,63})?(\.[^\s/.:,]{2,63})?)(?<port>\:\d{1,5})?(?<path>\/[\w\/]+(\.(\w{1,8}))?)?\b/mig;
    const findHtml =
        /<!?\/?\w+.+>.*<\/?\w+>|<!?\/?\w+.+>?/mig;
    const findBoldText = /(\*\*)([^*][{\p{P}\p{L}\p{N}]+?)(\*\*)/gmiu;
    const findStrikeTroughText = /(--)([^*][{\p{P}\p{L}\p{N}]+?)(--)/gmiu;
    const findItalicText = /(__)([^*][{\p{P}\p{L}\p{N}]+?)(__)/gmiu;
    const formatedComment = commentText.replace(findHtml, "")
        .replace(findLink, '<a href="$&" class="user-link">$&</a>')
        .replace(findBoldText, "<strong>$2</strong>")
        .replace(findStrikeTroughText, "<s>$2</s>")
        .replace(findItalicText, "<i>$2</i>");
    return formatedComment;
}

function formatName(nameText) {
    const checkName = /^([A-Z][a-z]+\s?){1,3}$/;
    if (nameText.match(checkName)) return true;
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
    } else if (!formatName($name)) {
        animateSubmit(false);
        errorWarning();
        $errorWindow.text(
            "Error: Name should consist of maximum three words, each word should start with capittal letter"
        );
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
    } else {
        $("#input_comment").val(formatComment($comment));
        if ($("#input_comment").val() == "") {
            animateSubmit(false);
            errorWarning();
            $errorWindow.text(
                "Error: HTML tags are not allowed! Input only text!");
            return false;
        } else return true;
    }
}

$(".submit").on("click", insertComment);
$("#input_area").on("keydown", (e) => {
    const keyEnter = 13;
    const keyEscape = 27;
    switch (e.which) {
        //По замечанию по поводу deprecated which из прошлого ДЗ.
        // We've decided to not mark this API as deprecated in the end as there's no direct native replacement. See https://github.com/jquery/jquery/issues/4755#issuecomment-664501730
    case keyEnter:
        insertComment();
        break;
    case keyEscape:
        clearInput(e);
        break;
    }
});

$(document)
    .on("click", deleteComment)
    .on("click", editComment);

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

$("#input_comment, .modal-comment").on('select', (e) => {
    const selectedText = window.getSelection().toString();
    let comment;
    if ($(".modal-wrapper").attr("display") == "none") {
        comment = $("#input_comment");
    } else comment = $(".modal-comment");

    if (selectedText && selectedText !== "") {
        $(".bold").off().on("click", () => {
            let editedText = comment.val().replace(
                selectedText, `**${selectedText}**`);
            comment.val(editedText);
            editedText = "";
        })
        $(".strike").off().on("click", () => {
            let editedText = comment.val().replace(
                selectedText, `--${selectedText}--`);
            comment.val(editedText);
            editedText = "";
        })
        $(".italic").off().on("click", () => {
            let editedText = comment.val().replace(
                selectedText, `__${selectedText}__`);
            comment.val(editedText);
            editedText = "";
        })
    }
});

const observer = new MutationObserver(() => {
    const jsonObj = JSON.stringify(commentsData);
    localStorage.setItem("comments", jsonObj);
});

observer.observe(document, {
    subtree: true,
    childList: true,
});

window.onload = build();