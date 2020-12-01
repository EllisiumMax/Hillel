"use strict";

const submitButton = document.getElementById("submit");
const resultsWindow = document.getElementById("results");
const userInput = document.getElementById("input");
const errorWindow = document.getElementById("error");
const errorField = document.getElementById("error_info");

function uniqYear(year) {
    if(year >= 1000 && year <= 9000) {
        let uniq = new Set(year);
        while(uniq.size != 4) {
            year++;
            uniq = new Set(String(year));
        }
        return ([...uniq].join(""));
    } else {
        errorWindow.style.display = "block";
        errorField.textContent =
            `Error: You entered - "${year}" which is not correct! Please enter any year from 1000 to 9000`;
        setTimeout(() => {
            errorWindow.style.display = "none";
        }, 4000);
    }
}

submitButton.onclick = () => {
    if(uniqYear(userInput.value)) {
        resultsWindow.innerHTML += "<p>" + uniqYear(userInput.value) +
            "</p>";
    }
    userInput.value = null;
}
