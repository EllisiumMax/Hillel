"use strict";

async function loadImmitation(divId, coverAll = false) {
    const appendArea = document.querySelector(divId);
    const preloader = document.createElement("div");
    const loader = document.createElement("div");
    preloader.className = "preloader";
    loader.className = "loader";
    if (coverAll) preloader.className = "preloader single";
    appendArea.append(preloader);
    preloader.append(loader);
    let random = Math.round(Math.random() * 4000) + 1000;
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            preloader.remove();
            resolve();
        }, random)
    });
    await promise;
}
