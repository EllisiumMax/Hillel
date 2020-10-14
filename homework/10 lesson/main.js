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
}

function restoreTask(event) {
  if (listToDo.querySelector(".to-do") === null) {
    listToDo.innerHTML = templateListName.innerHTML.replace(
      "{{listName}}",
      "To Do"
    );
  }
  const targetElement =
    event.target.nextSibling || event.target.previousSibling;
  listToDo.innerHTML += templateListItem.innerHTML
    .replace("{{text}}", targetElement.textContent)
    .replace("{{class}}", "to-do")
    .replace("{{reject-restore}}", "btn-delete")
    .replace("{{btn-text}}", "Delete");
  event.target.parentElement.remove();
  event.target.remove();
  if (listDone.querySelector(".done") === null) listDone.innerHTML = "";
  if (listRejected.querySelector(".rejected") === null)
    listRejected.innerHTML = "";
}

function moveToRejected(event) {
  if (listRejected.querySelector(".rejected") === null) {
    listRejected.innerHTML = templateListName.innerHTML.replace(
      "{{listName}}",
      "Rejected"
    );
  }

  listRejected.innerHTML += templateListItem.innerHTML
    .replace("{{class}}", "rejected")
    .replace("{{text}}", event.target.previousSibling.textContent)
    .replace("{{reject-restore}}", "btn-restore")
    .replace("{{btn-text}}", "Restore")
    .replace('<input type="checkbox" class="checkbox">', "");
  event.target.parentNode.remove();
  if (listToDo.querySelector(".to-do") === null) {
    listToDo.innerHTML = "";
  }
}

inputField.addEventListener("keydown", (e) => {
  if (e.code == "Enter") addToDo();
});

submitButton.addEventListener("click", (e) => {
  if (e.target.tagName != "BUTTON") return;
  addToDo();
});

listDone.addEventListener("change", (e) => {
  if (e.target.tagName != "INPUT") return;
  restoreTask(e);
});

listToDo.addEventListener("click", (e) => {
  if (e.target.tagName != "BUTTON") return;
  moveToRejected(e);
});
listRejected.addEventListener("click", (e) => {
  if (e.target.tagName != "BUTTON") return;
  restoreTask(e);
});
