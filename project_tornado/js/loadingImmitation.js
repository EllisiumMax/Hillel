"use strict";

async function loadImmitation(divId, coverAll = false) {
    const appendArea = document.querySelector(divId);
    console.log(appendArea);
    const preloader = document.createElement("div");
    const loader = document.createElement("div");
    preloader.className = "preloader";
    loader.className = "loader";
    if (coverAll) preloader.className = "preloader single";
    appendArea.append(preloader);
    preloader.append(loader);
    let random = Math.round(Math.random() * 5000);
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            console.log("Loaded after:" + random + "ms");
            preloader.remove();
            resolve();
        }, random)
    });
    await promise;
}
