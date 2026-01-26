// Basic Calculator JavaScript

console.log("JavaScript is connected!");

let display = document.getElementById('display');
let historyDisplay = document.getElementById('calcHistory');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

// Initialize display
function updateDisplay() {
    display.value = currentValue;
}

// Append number to display
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            return; // Prevent multiple decimals
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (operation !== null) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    historyDisplay.textContent = `${previousValue} ${getOperatorSymbol(op)}`;
    shouldResetDisplay = true;
}

// Get operator symbol for display
function getOperatorSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷'
    };
    return symbols[op] || op;
}

// Calculate result
function calculate() {
    if (operation === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;

    historyDisplay.textContent = `${previousValue} ${getOperatorSymbol(operation)} ${currentValue} =`;
    currentValue = result.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Calculate percentage
function percentage() {
    const current = parseFloat(currentValue);
    if (isNaN(current)) return;

    currentValue = (current / 100).toString();
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    historyDisplay.textContent = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Delete last character
function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    // Numbers
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }

    // Decimal point
    if (key === '.') {
        appendNumber('.');
    }

    // Operators
    if (key === '+') {
        appendOperator('+');
    }
    if (key === '-') {
        appendOperator('-');
    }
    if (key === '*') {
        appendOperator('*');
    }
    if (key === '/') {
        event.preventDefault(); // Prevent default browser search
        appendOperator('/');
    }

    // Enter or Equals
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }

    // Escape or C - Clear
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }

    // Backspace
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }

    // Percentage
    if (key === '%') {
        percentage();
    }
});

// Initialize
updateDisplay();