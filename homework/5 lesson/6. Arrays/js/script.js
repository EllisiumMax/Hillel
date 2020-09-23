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

function userInput(text) {
  //запрашивает значения и сохраняет их в массив объекта allValues:, пока пользователь не нажмет отмена.
  let input;
  while (input !== null) {
    input = prompt(text);
    if (input !== null) resultsObj.allValues.push(input);
  }
}

function numbersArray(objectArray) {
  //выбирает из массива объекта все числа и возвращает массив только числовых значений
  const numbers = [];
  for (let value of objectArray.allValues) {
    if (Number(value) && Number.isFinite(+value)) numbers.push(+value);
  }
  return numbers;
}

function findQuantityOfValues(objectArray) {
  // находит кол-во значений в массиве объекта и записывает в свойство elements:.
  if (objectArray.allValues.length > 0)
    objectArray.elements = objectArray.allValues.length;
}

function findMaxMinInteger(objectArray) {
  // находит максимальное и минимальное значение в массиве.
  let integerNumbers =[];
  for (let value of numbersArray(resultsObj)) {
    if(Number.isInteger(value)) integerNumbers.push(value);
  }
  let max = integerNumbers.sort((a, b) => {
    return b - a;
  });
  let min = integerNumbers.sort((a, b) => {
    return a - b;
  });

  if (min[0] === undefined && max[0] === undefined) {
    objectArray.minInteger = "No any integer numbers.";
    objectArray.maxInteger = "No any integer numbers.";
  } else {
    objectArray.minInteger = min[0];
    objectArray.maxInteger = max[0];
  }
}

function findArithmeticMean(objectArray) {
  // находит среднее арифметичесское всех целых чисел.
  const integerNumbers = [];
  let summ = 0;
  for (let value of numbersArray(resultsObj)) {
    if (Number.isInteger(value)) {
      integerNumbers.push(value);
      summ += value;
    }
  }
  let result = summ / integerNumbers.length;
  if (!isNaN(result)) objectArray.arithmeticMean = result.toFixed(2);
}

function findEvenPositiveIntegers(objectArray) {
  // находит общее количество четных положительных целых чисел.
  const integerNumbers = [];
  for (let value of numbersArray(resultsObj)) {
    if (value > 0 && value % 2 === 0) {
      integerNumbers.push(value);
    }
  }
  objectArray.evenPositiveIntegerElements =
    integerNumbers.length || "No any positive integer numbers";
}

function findNegativeNumbers(objectArray) {
  // находит количество отрицательных чисел.
  const negativeNumbers = [];
  for (let value of numbersArray(resultsObj)) {
    if (value < 0) negativeNumbers.push(value);
  }
  objectArray.negativeElements =
    negativeNumbers.length || "No any negative numbers";
}

function findSumOfFractionalNumbers(objectArray) {
  //  находит сумму всех дробных чисел.
  let fractionalNumbers = [];
  let summ = 0;
  for (let value of numbersArray(resultsObj)) {
    if (value % 1 !== 0) {
      fractionalNumbers.push(value);
      summ += +value;
    }
    if (fractionalNumbers.length !== 0)
      objectArray.fractionSum = +summ.toFixed(2);
  }
}

userInput("Input any value");
numbersArray(resultsObj);
findQuantityOfValues(resultsObj);
findMaxMinInteger(resultsObj);
findArithmeticMean(resultsObj);
findEvenPositiveIntegers(resultsObj);
findNegativeNumbers(resultsObj);
findSumOfFractionalNumbers(resultsObj);

console.log(resultsObj);
