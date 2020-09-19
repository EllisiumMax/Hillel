"use strict";

let operatorIsValid = false;
let choosenOperand;
let numbers = 0;



function validateOperator (value) {
    if (value == "+" || value == "*") return (choosenOperand = value) + (operatorIsValid = true);
    else return alert ("Enter valid operator! ( + or * )");
}

function validateOperand (value) {
    if (value === null) return console.log(parseInt(numbers));
    else if (value.trim().length > 6) return alert("Operator length must be less than 6 digits!");
    else if (!Number.isInteger(+value)) return alert("Operand must be an integer number!");
    else return numbers += +value + " ";
 
}

function userInput () { 
    let operator;
    let operand;
    do {
        operator = prompt("Enter operator!:");
        validateOperator(operator);
    } while (operatorIsValid === false);
    do {
        operand = prompt("Enter operand!:");
        validateOperand(operand);
    } while (operand !== null);

 }

 function sumValues (value) {
     numbers += value;

 }


userInput();

console.log(choosenOperand);
console.log(numbers);