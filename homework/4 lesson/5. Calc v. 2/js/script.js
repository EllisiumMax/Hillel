"use strict";

// let numbers = [];
// let selectedOperator;

// function inputOperator() {
//     const validOperators = ["+", "*"];
//     let operator;
//     while (!validOperators.includes(operator)) {
//         operator = prompt("Enter operator ( + or * )");
//         if (operator === null) return alert("Cancelled by user.");
//         else if (!validOperators.includes(operator)) alert("Error: Enter valid operator! ( + or * )")
//     };
//     return selectedOperator = operator;
// }

// function validateOperand(value) {
//     if (value === null) return;
//     else if (value.trim().length > 6) return alert("Operator length must be less than 6 digits!");
//     else if (!Number.isInteger(+value)) return alert("Operand must be an integer number!");
//     else return numbers.push(+value);

// }

// function inputOperand() {
//     if (selectedOperator === undefined) return;
//     let operand;
//     while (operand !== null) {
//         operand = prompt("Input operand");
//         validateOperand(operand);
//     }
// }

// function sumValues(value) {
//     let result = 0;
//     let expression = "";
//     for (let i = 0; i < value.length; i++) {
//         result += value[i];
//         expression += value[i] + " + ";
//     }
//     return alert(expression.slice(0, expression.length - 2) + " = " + result);
// }

// function multiplyValues(value) {
//     let result = "1";
//     let expression = "";
//     for (let i = 0; i < value.length; i++) {
//         result *= value[i];
//         expression += value[i] + " * ";
//     }
//     if (result >= Number.MAX_SAFE_INTEGER) return alert("Error: Value is too big!");
//     else if (result <= Number.MIN_SAFE_INTEGER) return alert("Error: Value is too small!")
//     return alert(expression.slice(0, expression.length - 2) + " = " + result);
// }

// function calculate(operator) {
//     if (numbers.length <= 1 && selectedOperator !== undefined) return alert('Error: Input at least two numbers.');
//     switch (operator) {
//         case "+":
//             sumValues(numbers);
//             break;
//         case "*":
//             multiplyValues(numbers);
//             break;
//     }
// }

// inputOperator();
// inputOperand();
// calculate(selectedOperator);

let selectedOperator = "undefined";

function userInput(text) {
  // заправшивает ввод оператора или операндов
  let userValue = prompt(text).trim();
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
  if (!Number.isInteger(+operand) || operand === "") {
    alert("Error: Please enter an integer number.");
  } else if (operand.startsWith("-") || operand.startsWith("+")) maxLength = 7;
  if (operand.length > maxLength) {
    alert("Error: Maximum length must be 6 digits.");
  }
  return true;
}

function sumValues(numbers) {
  // суммирует входящие значения и выдает полное математическое выражение с результатом
  let result = 0;
  for (let x of numbers.split(" ")) {
    result += +x;
  }
  return result;
}

function multiplyValues(numbers) {
  // умножает входящие значения и выдает полное математическое выражение с результатом
  let result = 1;
  for (let x of numbers.split(" ")) {
    result *= +x;
  }
  return result;
}

function validateMaxMinInteger(result) {
  // проверка результата из sumValues(numbers) или function multiplyValues(numbers) на min/max integer
  if (+result > Number.MAX_SAFE_INTEGER) {
    alert("Error: Result is bigger than MAX_SAFE_INTEGER!");
  } else if (+result < Number.MIN_SAFE_INTEGER) {
    alert("Error: Result is smaller than MIN_SAFE_INTEGER!");
  }
  return true;
}

function calculateResult() {
  // выбор функции суммы или умножения в зависимости от оператора сохраненного в глобальной переменной selectedOperator
}

