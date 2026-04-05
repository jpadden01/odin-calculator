let num1Global;
let operatorGlobal;
let num2Global;

let displayValue = document.querySelector(".display-value");
let numberButtons = document.querySelectorAll(".number, .zero");
let operatorButtons = document.querySelectorAll(".operator");

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            num1Global = add(num1, num2);
            break;
        case "−":
            num1Global = subtract(num1, num2);
            break;
        case "×":
            num1Global = multiply(num1, num2);
            break;
        case "÷":
            num1Global = divide(num1, num2);
            break;
    }
    num2Global = undefined;
    operatorGlobal = undefined;
    displayValue.textContent = num1Global;
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
    if (operatorGlobal === undefined) {
        num1Global = (num1Global === undefined)? 
            Number(num)
            : Number(num1Global.toString() + num);
        displayValue.textContent = num1Global;
    } else {
        num2Global = (num2Global === undefined)? 
            Number(num)
            : Number(num2Global.toString() + num);
        displayValue.textContent = num2Global;
    }
}

numberButtons.forEach((cur) => cur.addEventListener("click", () => updateNumber(cur.textContent)));
operatorButtons.forEach((cur) => {
    if (cur.textContent === "=") {
        cur.addEventListener("click", () => operate(num1Global, num2Global, operatorGlobal));
    } else {
        cur.addEventListener("click", () => operatorGlobal = cur.textContent);
    }
});