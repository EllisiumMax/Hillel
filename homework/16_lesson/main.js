"use strict";

const contentList = document.querySelector(".cat-list");
const elementsName = document.querySelector(".elem-name");
const elementDescription = document.querySelector(".elem-info");
let elementFullInfo = {};

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://swapi.dev/api/");
xhr.responseType = "json";
xhr.send();
xhr.onload = () => {
    for(let key in xhr.response) {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.innerText = key;
        contentList.append(btn);
    }
};

function load(url) {

    let infoArray = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        const resObj = xhr.response.results;
        for(let key of resObj) {
            const p = document.createElement("p");
            p.className = "element"
            p.innerText = key.name || key.title;
            elementsName.append(p);
            elementFullInfo[key.name || key.title] = key;

        }
        if(xhr.response.next !== null) load(xhr.response.next);
    }
}

function deleteKeys(obj) {
    for(let key in obj) {
        let subObj = obj[key];
        for(let val in subObj) {
            if((/https?:\/\//gmi)
                .test(subObj[val]) || subObj[val] == "") {
                delete obj[key][val];
            }
        }
    }
}

function randomQuote() {
    const quote = document.querySelector(".quote");
    const author = document.querySelector(".author");
    const phrases = [`“It’s not my fault.”`,
        `“Your focus determines your reality.”`,
        `“Do. Or do not. There is no try.”`,
        `“Somebody has to save our skins.”`,
        `“In my experience there is no such thing as luck.”`,
        `“I find your lack of faith disturbing.”`,
        `“So this is how liberty dies…with thunderous applause.”`,
        `“Your eyes can deceive you. Don’t trust them.”`,
        `“Never tell me the odds.”`,
        `“The Force will be with you. Always.”`,
        `“No. I am your father.”`,
        `“Now, young Skywalker, you will die.” `,
        `“Just for once, let me look on you with my own eyes.”`,
        `“May the Force be with you.”`,


    ];
    const authors = ["–  Han Solo", "– Qui-Gon Jinn", " – Master Yoda",
        "– Leia Organa", "– Obi-Wan Kenobi", "– Darth Vader",
        "– Padmé Amidala", "– Obi-Wan Kenobi", "– Han Solo",
        " — Obi-Wan Kenobi", "— Darth Vader", "— Emperor Palpatine",
        "— Anakin Skywalker", " — Obi-Wan Kenobi"
    ];
    const random = Math.floor(Math.random() * phrases.length);
    quote.textContent = phrases[random];
    author.textContent = authors[random];
}

randomQuote();

contentList.addEventListener("click", (e) => {
    if(e.target.tagName !== "BUTTON") return;
    elementDescription.innerHTML = "";
    elementsName.innerHTML = "";
    const btn = e.target.innerText;
    const contentHead = document.createElement("h2");
    switch (btn) {
    case "people":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/people/");
        break;
    case "planets":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/planets/");
        break;
    case "films":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/films/");
        break;
    case "species":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/species/");
        break;
    case "vehicles":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/vehicles/");
        break;
    case "starships":
        contentHead.innerText = e.target.innerText.toUpperCase() + ":";
        elementsName.append(contentHead);
        load("https://swapi.dev/api/starships/");
        break;
    }
});


elementsName.addEventListener("click", (e) => {
    if(e.target.className !== "element") return;
    deleteKeys(elementFullInfo);
    const targetObj = elementFullInfo[e.target.innerText];
    const h2 = document.createElement("h2");
    h2.innerText = e.target.innerText.toUpperCase();
    elementDescription.innerHTML = "";
    elementDescription.append(h2);
    for(let key in targetObj) {
        let p = document.createElement("p");
        p.className = "info";
        p.innerText = key[0].toUpperCase() + key.slice(1)
            .replace("_", " ") + ": " + targetObj[key];
        elementDescription.append(p);
    };
});
