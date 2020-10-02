"use strict";

const buttonAddLink = document.querySelector("#addLink");
const buttonClearAll = document.querySelector("#clearAll");


function addLink () {
    let webAdress = prompt('Please enter a web adress', 'https://www.google.com');
    if (webAdress === null || webAdress == '') return;
    let element = document.createElement("li");
    const linksList = document.querySelector("#links");
    element.className = "user-link";
    element.innerHTML = `<a href="${webAdress}">${webAdress}</a>`;
    linksList.append(element);
}

function clearLinks () {
    let emptyNode = document.createElement("ol");
    const linksList = document.querySelector("#links");
    emptyNode.id = "links";
    linksList.replaceWith(emptyNode);
}

buttonAddLink.onclick = addLink;
buttonClearAll.onclick = clearLinks;
