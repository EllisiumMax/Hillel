"use strict";

const inputField = document.getElementById("input-field");
const submitButton = document.getElementById("btn-submit");
const listToDo = document.getElementById("toDo");
const listDone = document.getElementById("done");
const listRejected = document.getElementById("rejected");
const templateListName = document.getElementById("template-list-name");
const templateListItem = document.getElementById("template-list-item");

function addToDo() {
  const value = inputField.value;

  if (value !== null && value !== "") {
    if (listToDo.querySelector(".to-do") === null) {
      listToDo.innerHTML = templateListName.innerHTML.replace(
        "{{listName}}",
        "To Do"
      );
    }
    listToDo.innerHTML += templateListItem.innerHTML
      .replace("{{text}}", inputField.value)
      .replace("{{class}}", "to-do")
      .replace("{{reject-restore}}", "btn-delete")
      .replace("{{btn-text}}", "Delete");
    inputField.value = "";
    const checkbox = document.querySelector(".checkbox");
    listToDo.addEventListener("change", moveToDone);
  }
}

function moveToDone(event) {
  if (listDone.querySelector(".done") === null) {
    listDone.innerHTML = templateListName.innerHTML.replace(
      "{{listName}}",
      "Done"
    );
  }

  listDone.innerHTML += templateListItem.innerHTML
    .replace("{{class}}", "done")
    .replace("{{text}}", event.target.nextSibling.textContent)
    .replace('<button class="{{reject-restore}}">{{btn-text}}</button>', "");
  event.target.parentElement.remove();
  event.target.remove();
  if (listToDo.querySelector(".to-do") === null) {
    listToDo.innerHTML = "";
  }
  const checkbox = listDone.querySelectorAll(".checkbox");
  checkbox.forEach((element) => {
    element.setAttribute("checked", "checked");
  });
  listDone.addEventListener("change", restoreTask);
}

function restoreTask (event) {
  if (listToDo.querySelector(".to-do") === null) {
    listToDo.innerHTML = templateListName.innerHTML.replace(
      "{{listName}}",
      "To Do"
    );
  }
  listToDo.innerHTML += templateListItem.innerHTML
  .replace("{{text}}", event.target.nextSibling.textContent)
  .replace("{{class}}", "to-do")
  .replace("{{reject-restore}}", "btn-delete")
  .replace("{{btn-text}}", "Delete");
  event.target.parentElement.remove();
  event.target.remove();
  if (listDone.querySelector(".done") === null) {
    listDone.innerHTML = "";
  }
}

submitButton.addEventListener("click", addToDo);
