const DISPLAY_WIDTH = 12;
const MAX_VALUE = 10 ** DISPLAY_WIDTH;
const MIN_VALUE = -(10 ** (DISPLAY_WIDTH - 1));

let num1;
let num2;
let operator;
let recentlyOperated;

let input = [];

const display = document.querySelector(".display-value");
const numberButtons = document.querySelectorAll(".number, .zero");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');

function operate() {
    switch (operator) {
        case "+":
            num1 = add();
            break;
        case "-":
            num1 = subtract();
            break;
        case "×":
            num1 = multiply();
            break;
        case "÷":
            num1 = divide();
            break;
    }
    num2 = undefined;
    operator = undefined;
    recentlyOperated = true;
    updateDisplay();
}

function add() {
    return num1 + num2;
}

function subtract() {
    return num1 - num2;
}

function multiply() {
    return num1 * num2;
}

function divide() {
    if (num2 === 0) {
        alert("Can not divide by zero");
        return num1;
    }
    return num1 / num2;
}

function updateInput(num) {
    input.push(num);
    recentlyOperated = false;
    trimInput();
    updateDisplay();
}

function updateDisplay() {
    const displayValue = recentlyOperated ? String(num1) : input.join("");

    if (Number(displayValue) > MAX_VALUE || Number(displayValue < MIN_VALUE)) {
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
    num1 = 0;
    num2 = undefined;
    input = [];
    operator = undefined;
    recentlyOperated = false;
    updateDisplay();
}

function setNumber() {
    const inputNumber = Number(input.join(""));
    if (recentlyOperated || !operator) {
        num1 = inputNumber;
        recentlyOperated = false;
    } else {
        num2 = inputNumber;
    }
    input = [];
}

function trimInput() {
    const isNegative = input[0] === '-';
    if (isNegative) input.shift();
    while (input[0] === '0') {
        input.shift();
    }
    if (isNegative) input.unshift('-');
}

function backspace() {
    input.pop();
    updateDisplay();
}

numberButtons.forEach((cur) => cur.addEventListener("click", () => updateInput(cur.textContent)));
operatorButtons.forEach((cur) => {
    switch (cur.textContent) {
        case "=":
            cur.addEventListener("click", () => {
                setNumber();
                operate();
            });
            break;
        case "-":
            cur.addEventListener("click", () => {
                if (recentlyOperated) {
                    operator = "-";
                    recentlyOperated = false;
                } else if (!input.length) {
                    updateInput("-");
                } else {
                    setNumber();
                    if (operator) {
                        operate();
                    }
                    operator = "-";
                }
            });
            break;
        default:
            cur.addEventListener("click", () => {
                if (!recentlyOperated) {
                    setNumber();
                }
                recentlyOperated = false;
                if (operator) {
                    operate();
                }
                operator = cur.textContent;
            });
    }
});
clearButton.addEventListener("click", () => {
    clear();
});
decimalButton.addEventListener("click", () => {
    if (!input.includes('.')) {
        updateInput('.');
    }
});
backspaceButton.addEventListener("click", backspace);