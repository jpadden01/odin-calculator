const DISPLAY_WIDTH = 12;
const MAX_VALUE = 10 ** DISPLAY_WIDTH;
const MIN_VALUE = -(10 ** (DISPLAY_WIDTH - 1));

let num1;
let num2;
let operator;
let recentlyOperated;

let input = [];

const display = document.querySelector(".display-value");

function setupInput() {
    const numberButtons = document.querySelectorAll(".number, .zero");
    const operatorButtons = document.querySelectorAll(".operator");
    const clearButton = document.querySelector(".clear");
    const decimalButton = document.querySelector('.decimal');
    const backspaceButton = document.querySelector('.backspace');

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
                        return recentlyOperated = false;
                    }

                    if (!input.length) return updateInput("-");

                    setNumber();
                    if (operator) operate();
                    operator = "-";
                });
                break;
            default:
                cur.addEventListener("click", () => {
                    if (!recentlyOperated) setNumber();
                    recentlyOperated = false;
                    if (operator) operate();
                    operator = cur.textContent;
                });
        }
    });
    clearButton.addEventListener("click", () => {
        clear();
    });
    decimalButton.addEventListener("click", () => {
        if (!input.includes('.')) updateInput('.');
    });
    backspaceButton.addEventListener("click", backspace);

    document.addEventListener("keydown", (e) => {
        console.log(e.key)
        if (!isNaN(e.key) || (e.key === '.' && !input.includes('.'))) {
            return updateInput(e.key);
        }
        switch (e.key) {
            case "Backspace":
                backspace();
                break;
            case "+":
                if (!recentlyOperated) setNumber();
                recentlyOperated = false;
                if (operator) operate();
                operator = e.key;
                break;
            case "-":
                if (recentlyOperated) {
                    operator = "-";
                    return recentlyOperated = false;
                }

                if (!input.length) return updateInput("-");

                setNumber();
                if (operator) operate();
                operator = "-";
                break;
            case "*":
                if (!recentlyOperated) setNumber();
                recentlyOperated = false;
                if (operator) operate();
                operator = "×";
                break;
            case "/":
                if (!recentlyOperated) setNumber();
                recentlyOperated = false;
                if (operator) operate();
                operator = "÷";
                break;
            case "=":
            case "Enter":
                setNumber();
                operate();
        }
    });
}

function operate() {
    switch (operator) {
        case "+":
            num1 = num1 + num2;
            break;
        case "-":
            num1 = num1 - num2;
            break;
        case "×":
            num1 = num1 * num2;
            break;
        case "÷":
            const isZero = num2 === 0;
            if (isZero) alert("Can not divide by zero");
            num1 = isZero ? num1 : num1 / num2;
            break;
    }
    num2 = undefined;
    operator = undefined;
    recentlyOperated = true;
    updateDisplay();
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
        clear();
        return display.textContent = "Too large...";
    }

    if (displayValue.length > DISPLAY_WIDTH) {
        return display.textContent = displayValue.substring(0, DISPLAY_WIDTH);
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
    input = [];
    if (recentlyOperated || !operator) {
        recentlyOperated = false;
        return num1 = inputNumber;
    }
    num2 = inputNumber;
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

setupInput();