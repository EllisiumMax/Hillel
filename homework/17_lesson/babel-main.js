"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var contentList = document.querySelector(".cat-list");
var elementsName = document.querySelector(".elem-name");
var elementDescription = document.querySelector(".elem-info");
var loadingAnimation1 = document.querySelector("#loader1");
var eventTargetText = "";
var elementFullInfo = {};
var elementsList = {};
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://swapi.dev/api/");
xhr.responseType = "json";
xhr.send();

xhr.onloadend = function () {
  loadingAnimation1.style = "display: none";

  for (var key in xhr.response) {
    var btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.innerText = key;
    btn.dataset.link = xhr.response[key];
    contentList.append(btn);
  }
};

function load(url) {
  var loadingComplete = false;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = function () {
    var resObj = xhr.response.results;

    var _iterator = _createForOfIteratorHelper(resObj),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;
        elementFullInfo[key.name || key.title] = key;
        elementsList[key.name || key.title] = "";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (xhr.response.next !== null) load(xhr.response.next);else if (xhr.response.next === null) loadingComplete = true;

    if (loadingComplete) {
      var loadingAnimation2 = document.querySelector("#loader2");
      loadingAnimation2.style = "display: none";
      buildElementsName(eventTargetText);
    }
  };
}

function buildElementsName(headerText) {
  var contentHead = document.createElement("h2");
  contentHead.innerText = headerText.toUpperCase() + ":";
  elementsName.append(contentHead);

  for (var key in elementsList) {
    var p = document.createElement("p");
    p.className = "element";
    p.innerText = key;
    elementsName.append(p);
  }

  elementsList = {};
}

function deleteKeys(obj) {
  for (var key in obj) {
    var subObj = obj[key];

    for (var val in subObj) {
      if (/https?:\/\//gmi.test(subObj[val]) || subObj[val] == "") {
        delete obj[key][val];
      }

      switch (val) {
        case "name":
        case "title":
        case "created":
        case "edited":
          delete obj[key][val];
          break;
      }
    }
  }
}

function randomQuote() {
  var quote = document.querySelector(".quote");
  var author = document.querySelector(".author");
  var phrases = ["\u201CIt\u2019s not my fault.\u201D", "\u201CYour focus determines your reality.\u201D", "\u201CDo. Or do not. There is no try.\u201D", "\u201CSomebody has to save our skins.\u201D", "\u201CIn my experience there is no such thing as luck.\u201D", "\u201CI find your lack of faith disturbing.\u201D", "\u201CSo this is how liberty dies\u2026with thunderous applause.\u201D", "\u201CYour eyes can deceive you. Don\u2019t trust them.\u201D", "\u201CNever tell me the odds.\u201D", "\u201CThe Force will be with you. Always.\u201D", "\u201CNo. I am your father.\u201D", "\u201CNow, young Skywalker, you will die.\u201D ", "\u201CJust for once, let me look on you with my own eyes.\u201D", "\u201CMay the Force be with you.\u201D"];
  var authors = ["–  Han Solo", "– Qui-Gon Jinn", " – Master Yoda", "– Leia Organa", "– Obi-Wan Kenobi", "– Darth Vader", "– Padmé Amidala", "– Obi-Wan Kenobi", "– Han Solo", " — Obi-Wan Kenobi", "— Darth Vader", "— Emperor Palpatine", "— Anakin Skywalker", " — Obi-Wan Kenobi"];
  var random = Math.floor(Math.random() * phrases.length);
  quote.textContent = phrases[random];
  author.textContent = authors[random];
}

randomQuote();
contentList.addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;

  if (contentList.querySelector(".selected-btn")) {
    var selectedButton = contentList.querySelector(".selected-btn");
    selectedButton.className = "nav-btn";
  }

  e.target.className = "selected-btn";
  elementDescription.innerHTML = "";
  var loader2 = document.createElement("div");
  loader2.id = "loader2";
  loader2.style = "display: inline-block";
  elementsName.innerHTML = "";
  elementsName.append(loader2);
  var btnValue = e.target.innerText;
  eventTargetText = btnValue;
  load(e.target.dataset.link);
});
elementsName.addEventListener("click", function (e) {
  if (e.target.className !== "element") return;

  if (elementsName.querySelector(".selected-text")) {
    var selectedText = elementsName.querySelector(".selected-text");
    selectedText.className = "element";
  }

  e.target.className = "selected-text";
  deleteKeys(elementFullInfo);
  var targetObj = elementFullInfo[e.target.innerText];
  var h2 = document.createElement("h2");
  h2.innerText = e.target.innerText.toUpperCase();
  elementDescription.innerHTML = "";
  elementDescription.append(h2);

  for (var key in targetObj) {
    var p = document.createElement("p");
    p.className = "info";
    p.innerText = key[0].toUpperCase() + key.slice(1).replace(/_/gm, " ") + ": " + targetObj[key];
    elementDescription.append(p);
  }

  ;
});
