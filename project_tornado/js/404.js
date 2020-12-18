"use strict";

const PANDA = document.getElementById("sad-panda");
const RANDOM = Math.random()*10;
PANDA.src = `./images/not-found.gif?v=${RANDOM}`;