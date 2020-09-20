"use strict";

let selectedOperator = "undefined";

function userInput(text) {
  // заправшивает ввод оператора или операндов
  let userValue = prompt(text);
  if (userValue !== null) userValue.trim();
  return userValue;
}

function validateOperator(operator) {
  // проверка оператора полученного из userInput () на соотвествие '+' или '*'
  const validOperators = "+ *";
  if (validOperators.includes(operator) && operator != "") {
    selectedOperator = operator;
    return true;
  } else {
    alert(`Error: Please enter valid operator: ( ${validOperators} )`);
    return false;
  }
}

function validateOperand(operand) {
  // проверка значений полученных из userInput (), - целое число, макс. длина 6 символов, не +/- Infinity
  let maxLength = 6;
  if (operand === null) return;
  else if (!Number.isInteger(+operand) || operand === "") {
    alert("Error: Please enter an integer number.");
  } else if (operand.startsWith("-") || operand.startsWith("+")) maxLength = 7;
  if (operand.length > maxLength) {
    alert("Error: Maximum length must be 6 digits.");
    return false;
  }
  return true;
}

function sumValues(numbers) {
  // суммирует входящие значения массива и выдает полное математическое выражение с результатом
  let result = 0;
  for (let x of numbers) {
    result += +x;
  }
  return result;
}

function multiplyValues(numbers) {
  // умножает входящие значения массива и выдает полное математическое выражение с результатом
  let result = 1;
  for (let x of numbers) {
    result *= +x;
  }
  return result;
}

function validateMaxMinInteger(result) {
  // проверка результата из sumValues(numbers) или multiplyValues(numbers) на min/max integer
  if (+result > Number.MAX_SAFE_INTEGER) {
    alert("Error: Result is bigger than MAX_SAFE_INTEGER!");
  } else if (+result < Number.MIN_SAFE_INTEGER) {
    alert("Error: Result is smaller than MIN_SAFE_INTEGER!");
  }
  return true;
}

function calculatePerOperator(operator, numbers) {
  // выбор функции суммы или умножения в зависимости от оператора сохраненного в глобальной переменной selectedOperator
  switch (operator) {
    case "+":
      return sumValues(numbers);
    case "*":
      return multiplyValues(numbers);
    default:
      alert("Critical Error: Unexpected operator!");
  }
}

function launchApplication() {
  // функция запуска калькулятора

  let operator;
  let operand;
  let numbers = [];
  let result;
  let fullExpression = "";

  do {
    operator = userInput("Input operator + or *");
    if (operator === null) {
      alert("Cancelled");
      return;
    }
  } while (!validateOperator(operator) && selectedOperator === "undefined");

  while (operand !== null) {
    operand = userInput("Input number");
    if (operand === null && numbers.length < 2) {
      alert("Error: Enter at least two values.");
      return;
    }
    if (validateOperand(operand) && operand !== "") {
      numbers.push(+operand);
      fullExpression += operand + " " + operator + " ";
    }
  }
  if (operand === null) {
    result = calculatePerOperator(operator, numbers);
  }
  if (validateMaxMinInteger(result))
    return alert(`${fullExpression.slice(0, -2)} = ${result}`);
}

launchApplication();
