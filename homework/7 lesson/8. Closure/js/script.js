"use strict";

function closureDivide (dividerValue = 1) {
  let result = 0;
  return function (value) {
    result = value / dividerValue;
    dividerValue = Math.ceil(result);
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
