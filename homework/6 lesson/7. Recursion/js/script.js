"use strict";

let arrValues = [
  [4],
  [1, 24, -23, 28, [4, 15, 2], 9, 55],
  23,
  5,
  194,
  [[22, [7, [45, [[34, 4], 3]]]], [3], [40, 324]],
  34,
  [1, 5, [[3, 2, 9], 349], [9]],
  75,
  [83, [3, -10, 5], 23],
  45,
  [[[[2], 1]]],
  453,
  123,
  99,
]; // сумма всех чисел = 2137

function summValues(array) {
  let summ = 0;
  for (let value of array) {
    if (Array.isArray(value)) summ += +summValues(value);
    else summ += +value;
  }
  return summ;
}

console.log(summValues(arrValues));
