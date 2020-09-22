"use strict";

const resultsObj = {
  allValues: [], //(массив всех введенных значений)
  elements: 0, //(общее количество элементов массива)
  minInteger: 0, //(наименьшее целое число)
  maxInteger: 0, //(наибольшее целое число)
  arithmeticMean: 0, //(среднее арифметическое)
  evenPositiveIntegerElements: 0, //(количество четных положительных целых чисел)
  negativeElements: 0, //(количество отрицательных чисел)
  fractionSum: 0, //(сумма всех дробных чисел)
};

function userInput() {
  //запрашивает значения и сохраняет их в массив объекта allValues:, пока пользователь не нажмет отмена.
  let input;
  while (input !== null) {
    input = prompt("Input any values");
    if (input !== null) resultsObj.allValues.push(input);
  }
}

function findQuantityOfValues(objectArray) {
  // находит кол-во значений в массиве объекта и записывает в свойство elements:.
  objectArray.elements = objectArray.allValues.length;
}

function findMaxMinInteger(objectArray) {
  // находит максимальное и минимальное значение в массиве.
  let max = Number.MAX_SAFE_INTEGER;
  let min = Number.MIN_SAFE_INTEGER;
  for (let values of objectArray.allValues) {
    if (Number.isInteger(+values) && +values >= min) max = +values;
    else if (Number.isInteger(+values) && +values  <= max) min = +values;
  }
  objectArray.minInteger = min;
  objectArray.maxInteger = max;
}

function findAverageInteger(array) {
  // находит среднее арифметичесское всех целых чисел.
}

function findEvenPositiveIntegers(array) {
  // находит общее количество четных положительных целых чисел.
}

function findNegativeNumbers(array) {
  // находит количество отрицательных чисел.
}

function findSumOfFractionalNumbers(array) {
  //  находит сумму всех дробных чисел.
}

userInput();
findQuantityOfValues(resultsObj);
findMaxMinInteger(resultsObj);
console.log(resultsObj);


// let array = ["1", 1.4, "wqdwq", 1, 444, 0, "eff", 5, -5.5];
