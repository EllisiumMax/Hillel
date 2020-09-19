"use strict";



let numbers = [];
let selectedOperator;

function inputOperator() {
    const validOperators = ["+", "*"];
    let operator;
    while (!validOperators.includes(operator)) {
        operator = prompt("Enter operator ( + or * )");
        if (operator === null) return alert("Cancelled by user.");
        else if (!validOperators.includes(operator)) alert("Error: Enter valid operator! ( + or * )")
    };
    return selectedOperator = operator;
}

function validateOperand(value) {
    if (value === null) return;
    else if (value.trim().length > 6) return alert("Operator length must be less than 6 digits!");
    else if (!Number.isInteger(+value)) return alert("Operand must be an integer number!");
    else return numbers.push(+value);

}

function inputOperand() {
    if (selectedOperator === undefined) return;
    let operand;
    while (operand !== null) {
        operand = prompt("Input operand");
        validateOperand(operand);
    }
}

function sumValues(value) {
    let result = 0;
    let expression = "";
    for (let i = 0; i < value.length; i++) {
        result += value[i];
        expression += value[i] + " + ";
    }
    return alert(expression.slice(0, expression.length - 2) + " = " + result);
}

function multiplyValues(value) {
    let result = "1";
    let expression = "";
    for (let i = 0; i < value.length; i++) {
        result *= value[i];
        expression += value[i] + " * ";
    }
    if (result >= Number.MAX_SAFE_INTEGER) return alert("Error: Value is too big!");
    else if (result <= Number.MIN_SAFE_INTEGER) return alert("Error: Value is too small!")
    return alert(expression.slice(0, expression.length - 2) + " = " + result);
}



function calculate(operator) {
    if (numbers.length <= 1 && selectedOperator !== undefined) return alert('Error: Input at least two numbers.');
    switch (operator) {
        case "+":
            sumValues(numbers);
            break;
        case "*":
            multiplyValues(numbers);
            break;
    }
}

inputOperator();
inputOperand();
calculate(selectedOperator);
