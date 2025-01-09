let firstOperand = null;
let firstOperator = null;
let secondOperator = null;
let secondOperand = null;
let displayValue = 0;
let result = null;
let button = document.querySelectorAll("button");


function operate (a, b, op) {
    if (op === "+") {
        return a + b;
    } else if (op === "-") {
        return a - b;
    } else if (op === "*") {
        return a * b;
    } else if (op === "/") {
        return a / b;
    }
};

function updateDisplay () {
    const display = document.querySelector("#display");
    display.textContent = displayValue;
};


function getValues () {
    button.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains("operand")) {
                getOperand (item.textContent);
                updateDisplay();
            } else if (item.classList.contains("operator")) {
                getOperator (item.textContent);
                updateDisplay();
            } else if (item.classList.contains("equals")) {
                getEquals();
                updateDisplay();
            } else if (item.classList.contains("clear")) {
                clearDisplay();
                updateDisplay();
            } else if (item.classList.contains("decimal")) {
                addDecimal(item.textContent);
                updateDisplay();
            } else if (item.classList.contains("percentage")) {
                getPercentage(displayValue);
                updateDisplay();
            } else if (item.classList.contains("inverse")) {
                getInverse(displayValue);
                updateDisplay();
            }
        });
    });
};

getValues();


function getOperand (operand) {
    if (firstOperator === null) {
        if (displayValue === 0 || displayValue === "0") {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }   else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    };
};

function getOperator (operator) {
    if (firstOperator === null) {
        firstOperand = displayValue;
        firstOperator = operator;
    } else if (firstOperator !== null) {
        secondOperand = displayValue;
    };
};

function getEquals () {
    if (firstOperand === null) {
        displayValue = displayValue;
    } else if (firstOperand !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator)
        displayValue = result;
    }
}

function clearDisplay () {
    displayValue = 0;
    firstOperator = null;
    firstOperand = null;
    secondOperand = null;
};

function addDecimal (dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = 0;
        displayValue += dot;
    } else {
        displayValue += dot;
    }
};

function getPercentage (num) {
    displayValue = num/100;
};

function getInverse (num) {
    displayValue = num * (-1);
}
