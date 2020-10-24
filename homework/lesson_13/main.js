"use strict";

// 1. при нажатии кнпоки сабмит или энтер получить значение инпутов DONE
// 2. создать элемент комментария, добавить значение ипнутов и кнопки удалить и изменить, добавить датау используя момент джс DONE
// 3. реализовать работу кнопоки удалить DONE
// 4. реализовать появление модального окна для кнопки редактировать DONE
// 5. реализовать работу модального окна
// 6. реализовать валидацию всех полей
// 7. сохранить базу комментариев в обьект и в локал сторадж через JSON
// 8. реализовать построение комментариев из локал сторадж через JSON


let commentsData = {
  counter: 0,
};

function clearInput(e) {
  if ($(e.target).prop("tagName") == "INPUT") $(e.target).val("");
}

function insertComment() {
  let $name;
  let $comment;
  let $oldHtml = $("#user_comments").html();
  if ($(".modal-wrapper").css("display", "none")) {
    $name = $("#input_name").val();
    $comment = $("#input_comment").val();
  } else {
    $name = $(".modal-name").val();
    $comment = $(".modal-comment").val();
  }
  let $template = $("#template_comment").html();
  ++commentsData.counter;
  let $newComment = $template
    .replace("{{name}}", $name)
    .replace("{{comment}}", $comment)
    .replace("{{date}}", moment().format("D/MM/YYYY, HH:mm:ss"))
    .replace("{{index}}", "comment_0" + commentsData.counter);
  $("#user_comments").html($oldHtml + $newComment);
  $("#user_comments")[0].lastElementChild.scrollIntoView({ behavior: "smooth" });
}

function deleteComment(e) {
  if ($(e.target).hasClass("btn-delete")) {
      let $comment = $(e.target).parent();
    $comment.slideUp(300);
    setTimeout((e) => $comment.remove(), 300);
  }
}

function editComment(e) {
    if ($(e.target).hasClass("btn-edit")) {
        $(".modal-wrapper").slideDown(200);
       
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
$("#user_comments").on("click", deleteComment).on("click", editComment);
$(".modal-cancel").on("click", () => $(".modal-wrapper").slideUp(200));
