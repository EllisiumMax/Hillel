"use strict";

const SUBMIT = document.querySelector(".submit");
const COMMENTS_AREA = document.querySelector("#user_comments");
const USER_NAME = document.querySelector("#input_name");
const USER_COMMENT = document.querySelector("#input_comment");
const TEMPLATE_COMMENT = document.querySelector("#template_comment");
const MODAL_WINDOW = document.querySelector(".modal-wrapper");
const data = {
  comments: "",
};

function saveData () {
  data.comments = COMMENTS_AREA.innerHTML;
  localStorage.setItem("comments", data.comments);
}

function getDate() {
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
  return timeStamp;
}

function insertComment() {
  if (!USER_NAME.value.trim() || !USER_COMMENT.value.trim()) return;

  COMMENTS_AREA.innerHTML += TEMPLATE_COMMENT.innerHTML
    .replace("{{name}}", USER_NAME.value)
    .replace("{{comment}}", USER_COMMENT.value)
    .replace("{{date}}", getDate());

  COMMENTS_AREA.lastElementChild.scrollIntoView({ behavior: "smooth" });
  saveData();
}

function deleteComment(e) {
  e.target.parentElement.remove();
  saveData();
}

function editComment(e) {
  let userName = e.target.parentElement.children[0];
  let userComment = e.target.parentElement.children[1];
  let dateCreated = e.target.parentElement.children[2];
  const okBtn = document.querySelector(".modal-ok");
  const inputName = document.querySelector(".modal-name");
  const inputComment = document.querySelector(".modal-comment");
  const edited = document.createElement("p");
  edited.className = "edited";

  inputName.value = userName.innerText;
  inputComment.value = userComment.innerText;
  MODAL_WINDOW.style.display = "block";
  okBtn.onclick = () => {
    if (
      userName.innerText !== inputName.value ||
      userComment.innerText !== inputComment.value
    ) {
      userName.innerText = inputName.value;
      userComment.innerText = inputComment.value;
      dateCreated.textContent = getDate();
      MODAL_WINDOW.style.display = "none";
      saveData();
      if (e.target.parentElement.querySelector(".edited")) return;
      else {
        edited.innerText = "EDITED";
        e.target.before(edited);
        saveData();
      }
    }
  };
  
}

document.addEventListener("click", (e) => {
  const tar = e.target.className;
  switch (tar) {
    case "submit":
      insertComment();
      break;
    case "btn-delete":
      deleteComment(e);
      break;
    case "btn-edit":
      editComment(e);
      break;
    case "modal-cancel":
      MODAL_WINDOW.style.display = "none";
      return;
    default:
      return;
  }
});

document.addEventListener("focusin", (e) => {
  if (e.target.tagName !== "INPUT") return;
  e.target.value = "";
});

function restoreData() {
  let data = localStorage.getItem("comments");
  COMMENTS_AREA.innerHTML = data;
}

window.onload = restoreData;