// Scientific Calculator JavaScript

console.log("JavaScript is connected!");

let display = document.getElementById('display');
let historyDisplay = document.getElementById('calcHistory');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;
let angleMode = 'deg'; // 'deg' or 'rad'
let expression = '';

// Initialize display
function updateDisplay() {
    display.value = currentValue;
}

// Switch angle mode
function switchAngleMode() {
    const radios = document.getElementsByName('angleMode');
    for (let radio of radios) {
        if (radio.checked) {
            angleMode = radio.value;
            break;
        }
    }
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
            return;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentValue === '') return;

    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    historyDisplay.textContent = `${previousValue} ${getOperatorSymbol(op)}`;
    shouldResetDisplay = true;
}

// Append bracket
function appendBracket(bracket) {
    if (shouldResetDisplay && bracket === '(') {
        currentValue = bracket;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && bracket === '(') {
            currentValue = bracket;
        } else {
            currentValue += bracket;
        }
    }
    updateDisplay();
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

// Degrees to radians conversion
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Radians to degrees conversion
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Scientific calculations
function scientificCalc(func) {
    let num = parseFloat(currentValue);
    if (isNaN(num) && func !== 'pow') return;

    let result;

    try {
        switch (func) {
            case 'sin':
                result = angleMode === 'deg' ? Math.sin(toRadians(num)) : Math.sin(num);
                historyDisplay.textContent = `sin(${num}${angleMode === 'deg' ? '°' : ' rad'})`;
                break;
            case 'cos':
                result = angleMode === 'deg' ? Math.cos(toRadians(num)) : Math.cos(num);
                historyDisplay.textContent = `cos(${num}${angleMode === 'deg' ? '°' : ' rad'})`;
                break;
            case 'tan':
                result = angleMode === 'deg' ? Math.tan(toRadians(num)) : Math.tan(num);
                historyDisplay.textContent = `tan(${num}${angleMode === 'deg' ? '°' : ' rad'})`;
                break;
            case 'log':
                if (num <= 0) {
                    alert('Logarithm undefined for non-positive numbers');
                    return;
                }
                result = Math.log10(num);
                historyDisplay.textContent = `log(${num})`;
                break;
            case 'ln':
                if (num <= 0) {
                    alert('Natural logarithm undefined for non-positive numbers');
                    return;
                }
                result = Math.log(num);
                historyDisplay.textContent = `ln(${num})`;
                break;
            case 'sqrt':
                if (num < 0) {
                    alert('Square root of negative number not supported');
                    return;
                }
                result = Math.sqrt(num);
                historyDisplay.textContent = `√(${num})`;
                break;
            case 'square':
                result = num * num;
                historyDisplay.textContent = `${num}²`;
                break;
            case 'cube':
                result = num * num * num;
                historyDisplay.textContent = `${num}³`;
                break;
            case 'pow':
                previousValue = currentValue;
                operation = 'pow';
                historyDisplay.textContent = `${previousValue}^`;
                shouldResetDisplay = true;
                return;
            case 'exp':
                result = Math.exp(num);
                historyDisplay.textContent = `e^${num}`;
                break;
            case 'factorial':
                if (num < 0 || !Number.isInteger(num)) {
                    alert('Factorial only works with non-negative integers');
                    return;
                }
                result = factorial(num);
                historyDisplay.textContent = `${num}!`;
                break;
            case 'percent':
                result = num / 100;
                historyDisplay.textContent = `${num}%`;
                break;
            default:
                return;
        }

        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        currentValue = result.toString();
        shouldResetDisplay = true;
        updateDisplay();

    } catch (error) {
        alert('Calculation error: ' + error.message);
        clearDisplay();
    }
}

// Factorial function
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    if (n > 170) {
        alert('Number too large for factorial calculation');
        return Infinity;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Insert mathematical constants
function insertConstant(constant) {
    if (constant === 'pi') {
        currentValue = Math.PI.toString();
        historyDisplay.textContent = 'π';
    } else if (constant === 'e') {
        currentValue = Math.E.toString();
        historyDisplay.textContent = 'e';
    }
    shouldResetDisplay = true;
    updateDisplay();
}

// Negate current value
function negate() {
    if (currentValue === '0') return;
    if (currentValue.charAt(0) === '-') {
        currentValue = currentValue.substring(1);
    } else {
        currentValue = '-' + currentValue;
    }
    updateDisplay();
}

// Calculate result
function calculate() {
    if (operation === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    try {
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
            case 'pow':
                result = Math.pow(prev, current);
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

    } catch (error) {
        alert('Calculation error: ' + error.message);
        clearDisplay();
    }
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
        event.preventDefault();
        appendOperator('/');
    }

    // Brackets
    if (key === '(') {
        appendBracket('(');
    }
    if (key === ')') {
        appendBracket(')');
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
});

// Initialize
updateDisplay();