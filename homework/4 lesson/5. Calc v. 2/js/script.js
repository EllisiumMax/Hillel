"use strict";



let numbers = [];

function inputOperator () {
    let validOperators = ["+", "*"];
    let operator;
    while(!validOperators.includes(operator)) {
        operator = prompt("Enter operator ( + or * )");
        if (operator === null) return alert("Cancelled by user.");
        else if (!validOperators.includes(operator)) alert("Error: Enter valid operator! ( + or * )")
    };
    return operator; 
}

function validateOperand (value) {
    if (value === null) return;
    else if (value.trim().length > 6) return alert("Operator length must be less than 6 digits!");
    else if (!Number.isInteger(+value)) return alert("Operand must be an integer number!");
    else return numbers.push(+value);
 
}

function userInput () { 
    let operand;
    while (operand !== null) {
        operand = prompt("Input operand");
        validateOperand(operand);
    }
}

function sumValues (value) {
     numbers += value;
}



userInput();
console.log(numbers);
