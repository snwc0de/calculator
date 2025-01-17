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
    };
};

function updateDisplay () {
    const display = document.querySelector("#display");
    display.textContent = displayValue;
    if (displayValue.length > 10) {
        display.textContent = displayValue.substring(0, 10);
    }
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
            } else if (item.classList.contains("backspace")) {
                deleteWithBackspace();
                updateDisplay();
            };
        });
    });
};

getValues();


function getOperand (operand) {
    if (firstOperator === null) {
        if (displayValue === 0 || displayValue === "0") {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        };
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        };
    };
};

function getOperator (operator) {
    if (firstOperator === null) {
        firstOperand = displayValue;
        firstOperator = operator;
    } else if (firstOperator !== null && secondOperand === null) {
        secondOperand = displayValue;
        secondOperator = operator;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = String(result);
        firstOperand = displayValue;
        result = null;
    } else if (firstOperand !== null && secondOperand !== null) {
        secondOperand = displayValue;
        secondOperator = operator
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = String(result);
        firstOperand = displayValue;
        result = null;
    };
};

function getEquals () {
    if (firstOperand === null) {
        displayValue = displayValue;
    } else if (firstOperand !== null && firstOperator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator)
        displayValue = String(result);
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
    };
};

function clearDisplay () {
    displayValue = 0;
    firstOperator = null;
    secondOperator = null;
    firstOperand = null;
    secondOperand = null;
    result = null;
};

function addDecimal (dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = 0;
        displayValue += dot;
    } else if (!displayValue.includes(dot)) {
        displayValue += dot;
    };
};

function getPercentage (num) {
    displayValue = (num/100).toString();
};

function getInverse (num) {
    displayValue = (num * (-1)).toString();
};

function deleteWithBackspace () {
    if (displayValue === 0 || displayValue === "0") {
        displayValue = displayValue;
    } else {
        num = displayValue.split("");
        num.splice(num.length - 1, 1);
        if (!num.length) {
            displayValue = "0";
        } else {
            displayValue = num.join(""); 
        };
    };
};


function addKeyboardSupport () {
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        let num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let operand = ["-", "+", "*", "/"];
        if (num.includes(key)) {
            getOperand(key);
            updateDisplay();
        } else if (operand.includes(key)) {
            getOperator(key);
            updateDisplay();
        } else if (key === '=' || key === 'Enter') {
            getEquals();
            updateDisplay();
        } else if (key === 'Escape' || key === 'Delete') {
            clearDisplay();
            updateDisplay();
        } else if (key === ".") {
            addDecimal(key);
            updateDisplay();
        } else if (key === "%") {
            getPercentage(displayValue);
            updateDisplay();
        } else if (key === "Tab") {
            getInverse(displayValue);
            updateDisplay();
        } else if (key === "Backspace") {
            deleteWithBackspace();
            updateDisplay();
        };
    });
};

addKeyboardSupport();