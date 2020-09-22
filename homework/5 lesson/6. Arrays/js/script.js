"use strict";

const ERROR_NO_NUMBERS = "Error: User didn't input any numbers";

const resultsObj = {
  allValues: [], //(массив всех введенных значений)
  elements: "none", //(общее количество элементов массива)
  minInteger: ERROR_NO_NUMBERS, //(наименьшее целое число)
  maxInteger: ERROR_NO_NUMBERS, //(наибольшее целое число)
  arithmeticMean: ERROR_NO_NUMBERS, //(среднее арифметическое)
  evenPositiveIntegerElements: "No positive integer numbers", //(количество четных положительных целых чисел)
  negativeElements: "none", //(количество отрицательных чисел)
  fractionSum: "none", //(сумма всех дробных чисел)
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
  let max = objectArray.allValues.sort((a, b) => {
    return b - a;
  })[0];
  let min = objectArray.allValues.sort((a, b) => {
    return a - b;
  })[0];
  if (max != "") objectArray.minInteger = +min;
  if (min != "") objectArray.maxInteger = +max;
  
}

function findArithmeticMean(objectArray) {
  // находит среднее арифметичесское всех целых чисел.
  const integerNumbers = [];
  let summ = 0;
  for (let value of objectArray.allValues) {
  let trimmedValue = value.trim();
    if (parseInt(+trimmedValue) && Number.isInteger(+trimmedValue)) {
      integerNumbers.push(trimmedValue);
      summ += +trimmedValue;
    }
  }
  let result = summ / integerNumbers.length;
  if (!isNaN(result)) objectArray.arithmeticMean = result;
  
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
  const negativeNumbers = [];
  for (let value of objectArray.allValues) {
    if (+value < 0) negativeNumbers.push(value);
  }
  objectArray.negativeElements = negativeNumbers.length;
}

function findSumOfFractionalNumbers(objectArray) {
  //  находит сумму всех дробных чисел.
}

userInput();
findQuantityOfValues(resultsObj);
findMaxMinInteger(resultsObj);
findArithmeticMean(resultsObj);
findEvenPositiveIntegers(resultsObj);
findNegativeNumbers(resultsObj);
console.log(resultsObj);
