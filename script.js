function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}
function calculate(operation, a, b) {
    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return b;
    }
}

let firstNum = '';
let secondNum = '';
let operator = '';
let result = '';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function updateDisplay(value) {
    display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener("click", () => handleClick(button.getAttribute('data-value')));
});

function handleClick(value) {
    if (!isNaN(value) || value === '.') {
        if (!operator) {
            if (value === '.' && firstNum.includes('.')) return;
            firstNum += value;
            updateDisplay(firstNum);
        } else {
            if (value === '.' && secondNum.includes('.')) return;
            secondNum += value;
            updateDisplay(secondNum);
        }
    } else if (value === 'C') {
        firstNum = '';
        secondNum = '';
        operator = '';
        result = '';
        updateDisplay('0');
    } else if (value === '⌫') {
        if (secondNum) {
            secondNum = secondNum.slice(0, -1);
            updateDisplay(secondNum || '0');
        } else if (operator) {
            operator = '';
        } else {
            firstNum = firstNum.slice(0, -1);
            updateDisplay(firstNum || '0');
        }
    } else if (value === '=') {
        if (firstNum && secondNum && operator) {
            const a = parseFloat(firstNum);
            const b = parseFloat(secondNum);
            result = calculate(operator, a, b);
            updateDisplay(result);
            firstNum = result.toString();
            secondNum = '';
            operator = '';
        }
    } else {
        if (firstNum && !secondNum) {
            operator = value;
        }
    }
}
