"use strict";

function accordion(div, transitionMS = 400) {
    const accordion = document.getElementById(div);
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
        accordionBody.style.maxHeight = "300px";
        opened = true;
        setTimeout(() => accordionBtn.src = "images/arrows-collapse.svg", transitionMS);

    }

    function toggle() {
        if(opened) close(transitionMS);
        else open(transitionMS);
    }
    accordionBtn.onclick = toggle;
}

accordion("overview-accordion");
accordion("specifications-accordion");
