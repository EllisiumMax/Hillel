"use strict";

const inputField = document.getElementById("input-field");
const submitButton = document.getElementById("btn-submit");
const listToDo = document.getElementById("toDo");
const listDone = document.getElementById("done");
const listRejected = document.getElementById("rejected");
const templateListName = document.getElementById("template-list-name");
const templateListItem = document.getElementById("template-list-item");
const modalWindow = document.getElementById("modal-window");
const templateModalWindow = document.getElementById("template-modal-window");

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
      .replace('<button class="{{reject-restore}}">{{btn-text}}</button>', "");
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
  listToDo.innerHTML += templateListItem.innerHTML
    .replace("{{class}}", "to-do")
    .replace('<button class="{{reject-restore}}">{{btn-text}}</button>', "");
  if (event.target.tagName == "BUTTON") {
    listToDo.innerHTML = listToDo.innerHTML.replace(
      "{{text}}",
      event.target.previousSibling.textContent
    );
  }
  if (event.target.tagName == "INPUT") {
    listToDo.innerHTML = listToDo.innerHTML.replace(
      "{{text}}",
      event.target.nextSibling.textContent
    );
  }
  if (event.target.tagName == "BUTTON") event.target.previousSibling.remove();
  if (event.target.tagName == "INPUT") event.target.parentElement.remove();
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
    .replace("{{text}}", event.target.textContent)
    .replace("{{reject-restore}}", "btn-restore")
    .replace("{{btn-text}}", "Restore")
    .replace('<input type="checkbox" class="checkbox">', "");

  event.target.remove();
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

listRejected.addEventListener("click", (e) => {
  if (e.target.tagName != "BUTTON") return;
  restoreTask(e);
});

function renameTask(event) {
  const newTask = prompt("Enter new task name", event.target.textContent);
  event.target.innerHTML = event.target.innerHTML.replace(event.target.textContent, newTask);
}

function customContextMenu(e) {
  e.preventDefault();
  if (e.target.tagName != "LI") return;
  modalWindow.innerHTML = templateModalWindow.innerHTML;
  const window = document.querySelector(".modalWindow");
  const btnDelete = document.querySelector(".context-delete");
  const btnRename = document.querySelector(".context-rename");
  window.style.left = e.pageX + "px";
  window.style.top = e.pageY + "px";

  btnDelete.onclick = () => {
    moveToRejected(e);
  };
  btnRename.onclick = () => {
    renameTask(e);
  };

  document.addEventListener("click", (e) => {
    if (e.target.id != "modal") window.remove();
  });
}
listToDo.addEventListener("contextmenu", customContextMenu);
document.addEventListener("contextmenu", (e) => e.preventDefault());
