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
  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;
  for (let values of objectArray.allValues) {
    if (Number.isInteger(+values) && +values >= max) max = +values;
    if (Number.isInteger(+values) && +values <= min) min = +values;
  }
  objectArray.minInteger = min;
  objectArray.maxInteger = max;
}

function findArithmeticMean(objectArray) {
  // находит среднее арифметичесское всех целых чисел.
  const integerNumbers = [];
  let summ = 0;
  for (let value of objectArray.allValues) {
    if (Number.isInteger(+value)) {
      integerNumbers.push(value);
      summ += +value;
    }
  }
  objectArray.arithmeticMean = summ / integerNumbers.length;
}

function findEvenPositiveIntegers(objectArray) {
  // находит общее количество четных положительных целых чисел.
  const integerNumbers = [];
  for (let value of objectArray.allValues) {
    if (parseInt(+value) > 0 && +value % 2 === 0) {
      integerNumbers.push(value);
    }
  }
  objectArray.evenPositiveIntegerElements = integerNumbers.length;
}

function findNegativeNumbers(objectArray) {
  // находит количество отрицательных чисел.
}

function findSumOfFractionalNumbers(objectArray) {
  //  находит сумму всех дробных чисел.
}

// userInput();
// findQuantityOfValues(resultsObj);
// findMaxMinInteger(resultsObj);
// findArithmeticMean(resultsObj);
// findEvenPositiveIntegers(resultsObj);
// console.log(resultsObj);
