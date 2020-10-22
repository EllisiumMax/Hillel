"use strict";

const SUBMIT = document.querySelector(".submit");
const COMMENTS_AREA = document.querySelector("#user_comments");
const USER_NAME = document.querySelector("#input_name");
const USER_COMMENT = document.querySelector("#input_comment");
const TEMPLATE_COMMENT = document.querySelector("#template_comment");
const MODAL_WINDOW = document.querySelector(".modal-wrapper");
const MODAL_NAME = document.querySelector(".modal-name");
const MODAL_COMMENT = document.querySelector(".modal-comment");
let commentsData = {
  counter: 0,
};

function saveData() {
  let jsonObj = JSON.stringify(commentsData);
  localStorage.setItem("comments", jsonObj);
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
  if (validateName(event)) {
    commentsData.counter += 1;
    COMMENTS_AREA.innerHTML += TEMPLATE_COMMENT.innerHTML
      .replace("{{name}}", USER_NAME.value)
      .replace("{{comment}}", USER_COMMENT.value)
      .replace("{{date}}", getDate())
      .replace("{{index}}", "comment_0" + commentsData.counter);

    COMMENTS_AREA.lastElementChild.scrollIntoView({ behavior: "smooth" });
    commentsData["comment_0" + commentsData.counter] = {
      name: USER_NAME.value,
      comment: USER_COMMENT.value,
      date: getDate(),
      edited: false,
      index: "comment_0" + commentsData.counter,
    };
    saveData();
  }
}

function deleteComment(e) {
  const commentID = e.target.parentElement.dataset.index;
  e.target.parentElement.remove();
  delete commentsData[commentID];
  saveData();
}

function editComment(e) {
  let userName = e.target.parentElement.children[0];
  let userComment = e.target.parentElement.children[1];
  let dateCreated = e.target.parentElement.children[2];
  const commentID = e.target.parentElement.dataset.index;
  console.log(commentID);
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
      if (validateName()) {
        userName.innerText = inputName.value;
        userComment.innerText = inputComment.value;
        dateCreated.textContent = getDate();
        MODAL_WINDOW.style.display = "none";
        commentsData[commentID].name = inputName.value;
        commentsData[commentID].comment = inputComment.value;
        commentsData[commentID].date = getDate();
        commentsData[commentID].edited = true;
        saveData();
        if (e.target.parentElement.querySelector(".edited")) return;
        else {
          edited.innerText = "EDITED";
          e.target.before(edited);
        }
      }
      saveData();
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

document.addEventListener("keydown", (e) => {
  if (
    e.code == "Enter" &&
    (MODAL_WINDOW.style.display == "" || MODAL_WINDOW.style.display == "none")
  )
    insertComment();
});

document.addEventListener("focusin", (e) => {
  if (e.target.tagName !== "INPUT") return;
  e.target.value = "";
});

function restoreLocalStorageData() {
  if (localStorage.getItem("comments")) {
    commentsData = JSON.parse(localStorage.getItem("comments"));
  }
}

function buildFromObj() {
  if (!localStorage.getItem("comments")) return;
  getValues(commentsData);

  function getValues(object) {
    for (let key in object) {
      if (typeof object[key] === "object") {
        let name = object[key].name;
        let comment = object[key].comment;
        let date = object[key].date;
        let edited = object[key].edited;
        let index = object[key].index;

        commentsData.counter += 1;
        COMMENTS_AREA.innerHTML += TEMPLATE_COMMENT.innerHTML
          .replace("{{name}}", name)
          .replace("{{comment}}", comment)
          .replace("{{date}}", date)
          .replace("{{index}}", index);

        if (edited) {
          const comment = document.querySelector(`[data-index="${index}"]`);
          const edited = document.createElement("p");
          edited.className = "edited";
          edited.innerText = "EDITED";
          comment.children[2].after(edited);
        }

        getValues(object[key]);
      }
    }
  }
}

function validateName(event) {
  let name;
  let comment;
  let modal = MODAL_WINDOW.style.display;

  if (modal == "block") {
    name = MODAL_NAME.value.trim();
    comment = MODAL_COMMENT.value.trim();
  }
  if (modal != "block") {
    name = USER_NAME.value.trim();
    comment = USER_COMMENT.value.trim();
  }

  if (!name) {
    alert("Input name");
    return;
  } else if (name.length < 3) {
    alert("Name length must be at least 3 symbols");
    return;
  } else if (name.length > 50) {
    alert("Name length must be less than 50 symbols");
    return;
  } else if (!comment) {
    alert("Input comment");
  } else if (comment.length < 2) {
    alert("Comment should have at least 2 symbols");
  } else if (comment.length > 300) {
    alert("Comment maximum length must be less than 300 symbols");
  } else return true;
}

window.onload = buildFromObj(restoreLocalStorageData());
