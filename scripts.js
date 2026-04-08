const DISPLAY_WIDTH = 12;
const MAX_VALUE = 10 ** DISPLAY_WIDTH;
const MIN_VALUE = -(10 ** (DISPLAY_WIDTH - 1));

let num1Global;
let num2Global;
let operatorGlobal;
let recentlyOperated;

let input = [];

const display = document.querySelector(".display-value");
const numberButtons = document.querySelectorAll(".number, .zero");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            num1Global = add(num1, num2);
            break;
        case "-":
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
    input.push(num);
    recentlyOperated = false;
    updateDisplay();
}

function updateDisplay() {
    const displayValue = recentlyOperated ? String(num1Global) : input.join("");

    if (Number(displayValue > MAX_VALUE)) {
        display.textContent = "Too large...";
        clear();
        return;
    }

    if (displayValue.length > DISPLAY_WIDTH) {
        display.textContent = displayValue.substring(0, DISPLAY_WIDTH);
        return;
    }

    display.textContent = displayValue;
}

function clear() {
    num1Global = 0;
    num2Global = undefined;
    input = [];
    operatorGlobal = undefined;
    recentlyOperated = false;
}

function setNumber() {
    const inputNumber = Number(input.join(""));
    if (recentlyOperated || !operatorGlobal) {
        num1Global = inputNumber;
        recentlyOperated = false;
    } else {
        num2Global = inputNumber;
    }
    input = [];
}

numberButtons.forEach((cur) => cur.addEventListener("click", () => updateNumber(cur.textContent)));
operatorButtons.forEach((cur) => {
    switch (cur.textContent) {
        case "=":
            cur.addEventListener("click", () => {
                setNumber();
                operate(num1Global, num2Global, operatorGlobal);
            });
            break;
        case "-":
            cur.addEventListener("click", () => {
                if (recentlyOperated) {
                    operatorGlobal = "-";
                    recentlyOperated = false;
                } else if (!input.length) {
                    input.push("-");
                } else {
                    setNumber();
                    if (operatorGlobal) {
                        operate(num1Global, num2Global, operatorGlobal);
                    }
                    operatorGlobal = "-";
                }
            });
            break;
        default:
            cur.addEventListener("click", () => {
                if (!recentlyOperated) {
                    setNumber();
                }
                recentlyOperated = false;
                if (operatorGlobal) {
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