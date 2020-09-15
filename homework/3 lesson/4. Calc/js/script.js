"use strict";

let result = 0;
let mathOperator = prompt("Input operator (+, -, *, /, **, %)").trim();

while (mathOperator !== "+" && mathOperator !== "-" && mathOperator !== "*" && mathOperator !== "/" && mathOperator !== "**" && mathOperator !== "%") {
    alert("This is not valid operator");
    mathOperator = prompt("Input operator (+, -, *, /, **, %)").trim();
    if (mathOperator === null) break;
}

function readOperand(message) {
    let operand = +(prompt(message)).trim();
    while (isNaN(operand)) {
        alert("Operand must be a digit");
        operand = +(prompt(message)).trim();
        if (operand === null) break;
    }
    return operand;
}

let operandA = readOperand("Input first operand");
let operandB = readOperand("Input second operand");

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
        result = (operandB === 0) ? result = "Error, can't divide by zero!" : operandA / operandB;
        break;
    case "**":
        result = operandA ** operandB;
        break;
    case "%":
        result = operandA % operandB;
        break;
}


alert(`${operandA} ${mathOperator} ${operandB} = ${result}`);
