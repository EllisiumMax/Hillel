"use strict";

const SUBMIT = document.querySelector("#submit");
const COMMENTS_AREA = document.querySelector("#user_comments");
const USER_NAME = document.querySelector("#input_name");
const USER_COMMENT = document.querySelector("#input_comment");

SUBMIT.addEventListener("click", (e) => {
  e.preventDefault();
  const singleComment = document.createElement("div");
  const userName = document.createElement("p");
  const userComment = document.createElement("p");
  const deleteComment = document.createElement("button");
  const editComment = document.createElement("button");


  singleComment.className = "comment";
  userName.textContent = USER_NAME.value;
  userComment.textContent = USER_COMMENT.value;
  deleteComment.innerHTML= "DELETE";
  editComment.innerHTML = "EDIT";


  COMMENTS_AREA.append(singleComment);
  singleComment.append(userName);
  singleComment.append(userComment);
  singleComment.append(deleteComment);
  singleComment.append(editComment);

} );