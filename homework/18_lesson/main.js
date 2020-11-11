"use strict";

const allTitles = document.querySelectorAll("div.title");
const objCollection = [];

function Accordion(domElement) {
    this.title = domElement.querySelector(".title");
    this.body = domElement.querySelector(".body");
    this._state = "closed";

    Object.defineProperty(this, "state", {
        get: function () {
            console.log("GET trriger");
            return this._state;
        },
        set: function (value) {
            if(value == "closed") {
                this.close();
                return this._state = value;
            } else if(value == "opened") {
                this.open();
                return this._state = value;
            }
        }
    });

};




Accordion.prototype.toggle = function () {
    if(this._state == "closed") {
        this.open();
    } else if(this._state == "opened") {
        this.close();
    };
};

Accordion.prototype.open = function () {
    this.body.style = "display: block";
    this._state = "opened";
};

Accordion.prototype.close = function () {
    this.body.style = "display: none";
    this._state = "closed";
};

function accordionElements() {
    const allAccordions = Array.from(document.querySelectorAll(".accordion"));
    const accordionsObjectsArray = [];

    for(let i = 0; i < allAccordions.length; i++) {
        accordionsObjectsArray.push(Array.from(allAccordions[i].children));
    }

    for(let i = 0; i < accordionsObjectsArray.length; i++) {
        accordionsObjectsArray[i].forEach(element => objCollection.push(
            new Accordion(element)));
    }
}

accordionElements();

allTitles.forEach((element, index) => {
    element.addEventListener("click", (e) => {
        objCollection[index].toggle();
    });
});
