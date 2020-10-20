"use strict";

const SUBMIT = document.querySelector(".submit");
const COMMENTS_AREA = document.querySelector("#user_comments");
const USER_NAME = document.querySelector("#input_name");
const USER_COMMENT = document.querySelector("#input_comment");
const TEMPLATE_COMMENT = document.querySelector("#template_comment");

function insertComment() {
  if (!USER_NAME.value.trim() || !USER_COMMENT.value.trim()) return;
  const currentDate = new Date();
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const timeStamp = currentDate.toLocaleString("ru", dateOptions);

  COMMENTS_AREA.innerHTML += TEMPLATE_COMMENT.innerHTML
    .replace("{{name}}", USER_NAME.value)
    .replace("{{comment}}", USER_COMMENT.value)
    .replace("{{date}}", timeStamp);
}

document.addEventListener("click", (e) => {
  const tar = e.target.className;
  switch (tar) {
    case "submit":
      insertComment();
      break;
    default:
      return;
  }
});

document.addEventListener("focusin", (e) => {
  if (e.target.tagName !== "INPUT") return;
  e.target.value = "";
});
