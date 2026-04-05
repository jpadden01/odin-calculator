let num1;
let operator;
let num2;

let displayValue = document.querySelector(".display-value");
let numberButtons = document.querySelectorAll(".number, .zero");

function operate(num1, num2, operator) {
    switch (operator) {
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) return "Can not divide by zero"
    return num1 / num2;
}

function updateNumber(num) {
    if (operator === undefined) {
        num1 = (num1 === undefined)? 
            num
            : Number(num1.toString() + num);
        displayValue.textContent = num1;
    } else {
        num2 = (num2 === undefined)? 
            num
            : Number(num2.toString() + num);
        displayValue.textContent = num2;
    }
}

numberButtons.forEach((cur) => cur.addEventListener("click", () => updateNumber(cur.textContent)));