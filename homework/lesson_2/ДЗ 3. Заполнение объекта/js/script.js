"use strict";

let infoObject = {};

infoObject["make"] = prompt("Введите марку машины");
infoObject["model"] = prompt("Введите модель");
infoObject["color"] = prompt("Введите цвет");
infoObject["year"] = prompt("Введите год выпуска");
infoObject["transmission"] =prompt("Введите тип трансмисии");

let result = "";

for (let key in infoObject ) {
    result += " " + key + " " + infoObject[key];
}


alert(result);