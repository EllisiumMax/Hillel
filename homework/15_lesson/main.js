"use strict";

function clock() {
    const currentTime = moment();
    const hours0 = document.getElementById("hours0");
    const hours1 = document.getElementById("hours1");
    const minutes0 = document.getElementById("minutes0");
    const minutes1 = document.getElementById("minutes1");
    const seconds0 = document.getElementById("seconds0");
    const seconds1 = document.getElementById("seconds1");

    const day = document.getElementById("day");
    const dayMonth = document.getElementById("day-month");
    const year = document.getElementById("year");
    const timeZone = document.getElementById("time-zone");
    
    hours0.innerText = currentTime.format("HH").slice(0, 1);
    hours1.innerText = currentTime.format("HH").slice(-1);
    minutes0.innerText = currentTime.format("mm").slice(0, 1);
    minutes1.innerText = currentTime.format("mm").slice(-1);
    seconds0.innerText = currentTime.format("ss").slice(0, 1);
    seconds1.innerText = currentTime.format("ss").slice(-1);
    day.innerText = currentTime.format("dddd");
    dayMonth.innerText = currentTime.format("DD MMMM");
    year.innerText = currentTime.format("YYYY");
    timeZone.innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setTimeout(function clockWork() {
        if (+seconds1.innerText <= 9) {
            ++seconds1.innerText;
            animate(seconds1);
        }
        if (+seconds1.innerText > 9) {
            seconds1.innerText = 0;
            ++seconds0.innerText;
            animate(seconds0);
        }
        if (+seconds0.innerText >= 6) {
            seconds0.innerText = 0;
            ++minutes1.innerText;
            animate(minutes1);
        }
        if (+minutes1.innerText > 9) {
            minutes1.innerText = 0;
            ++minutes0.innerText;
            animate(minutes0);
        }
        if (+minutes0.innerText >= 6) {
            minutes0.innerText = 0;
            ++hours1.innerText;
            animate(hours1);
        }
        if (+hours1.innerText > 9) {
            hours1.innerText = 0;
            ++hours0.innerText;
            animate(hours0);
        }
        if (+hours0.innerText == 2 && +hours1.innerText >= 4) {
            hours0.innerText = 0;
            hours1.innerText = 0;
            day.innerText = currentTime.add(1, 'd').format("dddd");
            dayMonth.innerText = currentTime.format("DD MMMM");
            year.innerText = currentTime.format("YYYY");
            animate(hours0);
            animate(hours1);
        }
        setTimeout(clockWork, 1000);
    }, 1000);
}

function animate(element) {
    let from = 0;
    let to = -200;
    setTimeout(function move() {
        if (from > to) {
            from -= 10;
            setTimeout(move);
        } else if (from === -200) {
            from = 200;
            to = 0;
            from += 10;
            setTimeout(move);
        }
        element.style.top = from + "px";
    });
}

clock(); 