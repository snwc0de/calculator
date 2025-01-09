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
                getEquals()
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
            console.log(displayValue);
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
        console.log(firstOperator)
    } else if (firstOperator !== null) {
        secondOperand = displayValue;
        console.log(secondOperand);
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
