"use strict";

let personWeight = prompt('Введите Ваш вес в килограммах', '');
let personHeight = prompt('Введите Ваш рост в сантиметрах', '');

function bodyMassIndex(weight, height) {

    (weight === "" || isNaN(weight)) ? weight = 85: console.log(weight);
    (height === "" || isNaN(height)) ? height = 190: console.log(height);

    const heightInMeters = height / 100;
    const result = weight / Math.pow(heightInMeters, 2);

    return (alert(`Индекс массы тела = ${(result).toFixed(1)}`));

}

bodyMassIndex(personWeight, personHeight);


