"use strict";

const buttonAddLink = document.querySelector("#addLink");
const buttonClearAll = document.querySelector("#clearAll");
const linkList = document.querySelector("#main");

function addLink () {
    let id = 0;
    return function () {
        const webAdress = prompt('Please enter a web adress', 'https://www.google.com');
        if (webAdress === null || webAdress == '') return;
        const element = document.createElement("li");
        const linksList = document.querySelector("#links");
        element.className = "user-link";
        element.id = "link" + ++id;
        element.innerHTML = `<a href="${webAdress}">${webAdress}</a>`;
        linksList.append(element);
        const button = document.createElement("button");
        button.className = "button button-delete";
        button.id = "delete" + id;
        button.innerHTML = "удалить";
        element.append(button);
    };
}



function clearLinks () {
    const emptyNode = document.createElement("ol");
    const linksList = document.querySelector("#links");
    emptyNode.id = "links";
    emptyNode.className = "link-list";
    linksList.replaceWith(emptyNode);
}

function deleteLink (event) {
    let eventID = event.target.id.slice(6);
    const link = document.querySelector(`#link${eventID}`);
    if (link) link.remove();
    else return;
    
}

buttonAddLink.onclick = addLink();
buttonClearAll.onclick = clearLinks;
linkList.addEventListener("click", deleteLink);


