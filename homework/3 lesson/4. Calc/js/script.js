"use strict";

let result = 0;
let mathOperator = prompt("Input operator (+, -, *, /, **, %)").trim();

while (mathOperator !== "+" && mathOperator !== "-" && mathOperator !== "*" && mathOperator !== "/" && mathOperator !== "**" && mathOperator !== "%") {
    alert("This is not valid operator");
    mathOperator = prompt("Input operator (+, -, *, /, **, %)").trim();
    if (mathOperator === null) break;
}

let operandA = +prompt("Input first operand").trim();

while (isNaN(operandA)) {
    alert("Operand must be a digit");
    operandA = +prompt("Input first operand").trim();
    if (operandA === null) break;
}

let operandB = +prompt("Input second operand").trim();

while (isNaN(operandB)) {
    alert("Operand must be a digit");
    operandB = +prompt("Input second operand").trim();
    if (operandB === null) break;
}

switch (mathOperator) {
    case "+":
        result = operandA + operandB;
        break;
    case "-":
        result = operandA - operandB;
        break;
    case "*":
        result = operandA * operandB;
        break;
    case "/":
        result = (operandB === 0) ? "Error, can't divide by zero!" : operandA / operandB;
        break;
    case "**":
        result = operandA ** operandB;
        break;
    case "%":
        result = operandA % operandB;
        break;
}


alert(`${operandA} ${mathOperator} ${operandB} = ${result}`);
