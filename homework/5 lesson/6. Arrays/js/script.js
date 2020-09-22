"use strict";


const resultsObj = {
  allValues: [], //(массив всех введенных значений)
  elements: "No elements.", //(общее количество элементов массива)
  minInteger: "No any integer numbers.", //(наименьшее целое число)
  maxInteger: "No any integer numbers.", //(наибольшее целое число)
  arithmeticMean: "No any integer numbers.", //(среднее арифметическое)
  evenPositiveIntegerElements: "No any positive, even, integer numbers.", //(количество четных положительных целых чисел)
  negativeElements: "No any negative elements.", //(количество отрицательных чисел)
  fractionSum: "No any fractional numbers.", //(сумма всех дробных чисел)
};

function userInput() {
  //запрашивает значения и сохраняет их в массив объекта allValues:, пока пользователь не нажмет отмена.
  let input;
  while (input !== null) {
    input = prompt("Input any values");
    if (input !== null) resultsObj.allValues.push(input);
  }
}

function getNumbers (objectArray) {
  const numbersArray = [];
  for (let value of objectArray.allValues) {
    if(parseInt(+value)) numbersArray.push(+value);
  }
  return console.log(numbersArray);
}

function findQuantityOfValues(objectArray) {
  // находит кол-во значений в массиве объекта и записывает в свойство elements:.
  objectArray.elements = objectArray.allValues.length;
}

function findMaxMinInteger(objectArray) {
  // находит максимальное и минимальное значение в массиве.
  let max = parseInt(objectArray.allValues.sort((a, b) => {
    return +b - +a;
  })[0]);
  let min = parseInt(objectArray.allValues.sort((a, b) => {
    return +a - +b;
  })[0]);

  if (!isNaN(min)) objectArray.minInteger = +min;
  if (!isNaN(max)) objectArray.maxInteger = +max;
  
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
  let result = 0;
  for (let value of objectArray.allValues) {
    if (parseInt(+value) % 2 !== 0) result += +value;
  }
  objectArray.fractionSum = result;
}

userInput();
findQuantityOfValues(resultsObj);
findMaxMinInteger(resultsObj);
findArithmeticMean(resultsObj);
findEvenPositiveIntegers(resultsObj);
findNegativeNumbers(resultsObj);
findSumOfFractionalNumbers(resultsObj);
getNumbers(resultsObj);
console.log(resultsObj);
