const DISPLAY_WIDTH = 12;
const MAX_VALUE = 10 ** DISPLAY_WIDTH;
const MIN_VALUE = -(10 ** (DISPLAY_WIDTH - 1));

let num1Global;
let num2Global;
let operatorGlobal;
let recentlyOperated;

const display = document.querySelector(".display-value");
const numberButtons = document.querySelectorAll(".number, .zero");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");

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
    recentlyOperated = true;
    updateDisplay();
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
    if (num2 === 0) {
        alert("Can not divide by zero");
        return num1;
    } 
    return num1 / num2;
}

function updateNumber(num) {
    if (recentlyOperated) {
        num1Global = Number(num);
    } else if (operatorGlobal === undefined) {
        num1Global = (num1Global === undefined)? Number(num) : Number(num1Global.toString() + num);
    } else {
        num2Global = (num2Global === undefined)? Number(num) : Number(num2Global.toString() + num);
    }
    recentlyOperated = false;
    updateDisplay();    
}

function updateDisplay() {
    let displayValue = (num2Global === undefined)? num1Global : num2Global;
 
    if (displayValue < MIN_VALUE || MAX_VALUE < displayValue) {
        displayValue = "Too large...";
        clear();
    }

    displayValue = String(displayValue);
    if (displayValue.length > DISPLAY_WIDTH) {
        displayValue = displayValue.substring(0, DISPLAY_WIDTH);
    }

    display.textContent = displayValue;
}

function clear() {
    num1Global = 0;
    num2Global = undefined;
    operatorGlobal = undefined;
    recentlyOperated = true;
}

numberButtons.forEach((cur) => cur.addEventListener("click", () => updateNumber(cur.textContent)));
operatorButtons.forEach((cur) => {
    if (cur.textContent === "=") {
        cur.addEventListener("click", () => operate(num1Global, num2Global, operatorGlobal));
    } else {
        cur.addEventListener("click", () => {
            if (num2Global) {
                operate(num1Global, num2Global, operatorGlobal);
            }
            operatorGlobal = cur.textContent;
        });
    }
});
clearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
});