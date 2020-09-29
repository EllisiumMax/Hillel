"use strict";

function closureDivide (dividerValue) {
  let result = 0;
  let divider = dividerValue || 1;
  return function (value) {
    result = value / divider;
    divider = Math.round(result);
    return result;
  }
}

let divide = closureDivide(2); // делитель по умолчанию передается в аргумент этой функции

// console.log(divide(2));
// console.log(divide(1));
// console.log(divide(7));
// console.log(divide(70));
// console.log(divide(2));

console.log(divide(1));
console.log(divide(7));
console.log(divide(70));
console.log(divide(2));
