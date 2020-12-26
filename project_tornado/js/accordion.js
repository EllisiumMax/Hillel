"use strict";

function accordion(div, transitionMS = 400, maxHeightPX = "700px") {
    const accordion = document.getElementById(div);
    const accordionTitle = accordion.querySelector(".title");
    const accordionBody = accordion.getElementsByClassName("accordion-body")[0];
    accordionBody.style.transitionDuration = transitionMS + "ms";
    const accordionBtn = accordion.getElementsByClassName("accordion-btn")[0];
    let opened = false;

    function close(transitionMS) {
        accordionBody.style.maxHeight = "0px";
        opened = false;
        setTimeout(() => accordionBtn.src = "images/arrows-expand.svg", transitionMS);
    }

    function open(transitionMS) {
        accordionBody.style.maxHeight = maxHeightPX;
        opened = true;
        setTimeout(() => accordionBtn.src = "images/arrows-collapse.svg", transitionMS);

    }

    function toggle() {
        if(opened) close(transitionMS);
        else open(transitionMS);
    }
    accordionBtn.onclick = toggle;
    accordionTitle.onclick = toggle;
}

accordion("overview-accordion");
accordion("specifications-accordion");
accordion("comments-accordion", 800, "8000px");