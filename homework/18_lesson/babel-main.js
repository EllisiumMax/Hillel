"use strict";

var allTitles = document.querySelectorAll("div.title");
var objCollection = [];

function Accordion(domElement) {
  this.title = domElement.querySelector(".title");
  this.body = domElement.querySelector(".body");
  this._state = "closed";
  Object.defineProperty(this, "state", {
    get: function get() {
      console.log("GET trriger");
      return this._state;
    },
    set: function set(value) {
      if (value == "closed") {
        this.close();
        return this._state = value;
      } else if (value == "opened") {
        this.open();
        return this._state = value;
      }
    }
  });
}

;

Accordion.prototype.toggle = function () {
  if (this._state == "closed") {
    this.open();
  } else if (this._state == "opened") {
    this.close();
  }

  ;
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
  var allAccordions = Array.from(document.querySelectorAll(".accordion"));
  var accordionsObjectsArray = [];

  for (var i = 0; i < allAccordions.length; i++) {
    accordionsObjectsArray.push(Array.from(allAccordions[i].children));
  }

  for (var _i = 0; _i < accordionsObjectsArray.length; _i++) {
    accordionsObjectsArray[_i].forEach(function (element) {
      return objCollection.push(new Accordion(element));
    });
  }
}

accordionElements();
allTitles.forEach(function (element, index) {
  element.addEventListener("click", function (e) {
    objCollection[index].toggle();
  });
});
