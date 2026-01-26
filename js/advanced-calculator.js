// Advanced Calculator JavaScript - Unified Basic + Scientific + Math

console.log("JavaScript is connected!");

// Advanced Calculator JavaScript - Unified Basic + Scientific + Math

let display = document.getElementById('display');
let historyDisplay = document.getElementById('calcHistory');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;
let angleMode = 'deg'; // 'deg' or 'rad'
let currentMode = 'simple'; // 'simple' or 'advanced'

// Initialize display
function updateDisplay() {
    display.value = currentValue;
}

// Switch between Simple and Advanced modes
function switchMode(mode) {
    currentMode = mode;
    const simpleBtn = document.getElementById('simpleMode');
    const advancedBtn = document.getElementById('advancedMode');
    const advancedButtons = document.getElementById('advancedButtons');
    const angleModeContainer = document.getElementById('angleModeContainer');
    const simpleGuide = document.getElementById('simpleGuide');
    const advancedGuide = document.getElementById('advancedGuide');

    if (mode === 'simple') {
        // Switch to Simple Mode
        simpleBtn.classList.add('active');
        advancedBtn.classList.remove('active');
        advancedButtons.style.display = 'none';
        angleModeContainer.style.display = 'none';
        simpleGuide.style.display = 'block';
        advancedGuide.style.display = 'none';
    } else {
        // Switch to Advanced Mode
        simpleBtn.classList.remove('active');
        advancedBtn.classList.add('active');
        advancedButtons.style.display = 'grid';
        angleModeContainer.style.display = 'block';
        simpleGuide.style.display = 'none';
        advancedGuide.style.display = 'block';
    }
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
            // Replace the initial 0 with the new number
            currentValue = num;
        } else if (num === '.' && currentValue.includes('.')) {
            // Prevent multiple decimals
            return;
        } else {
            // Append the number (works for single digits, 00, 000, etc.)
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
    if (isNaN(num) && !['pow', 'mod'].includes(func)) return;

    let result;

    try {
        switch (func) {
            // Trigonometric functions
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
            case 'asin':
                if (num < -1 || num > 1) {
                    alert('Inverse sine domain error: value must be between -1 and 1');
                    return;
                }
                result = angleMode === 'deg' ? toDegrees(Math.asin(num)) : Math.asin(num);
                historyDisplay.textContent = `sin⁻¹(${num})`;
                break;
            case 'acos':
                if (num < -1 || num > 1) {
                    alert('Inverse cosine domain error: value must be between -1 and 1');
                    return;
                }
                result = angleMode === 'deg' ? toDegrees(Math.acos(num)) : Math.acos(num);
                historyDisplay.textContent = `cos⁻¹(${num})`;
                break;

            // Logarithmic functions
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

            // Exponential functions
            case 'exp':
                result = Math.exp(num);
                historyDisplay.textContent = `e^${num}`;
                break;
            case 'pow10':
                result = Math.pow(10, num);
                historyDisplay.textContent = `10^${num}`;
                break;

            // Roots
            case 'sqrt':
                if (num < 0) {
                    alert('Square root of negative number not supported');
                    return;
                }
                result = Math.sqrt(num);
                historyDisplay.textContent = `√(${num})`;
                break;
            case 'cbrt':
                result = Math.cbrt(num);
                historyDisplay.textContent = `∛(${num})`;
                break;

            // Powers
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

            // Advanced operations
            case 'abs':
                result = Math.abs(num);
                historyDisplay.textContent = `|${num}|`;
                break;
            case 'factorial':
                if (num < 0 || !Number.isInteger(num)) {
                    alert('Factorial only works with non-negative integers');
                    return;
                }
                result = factorial(num);
                historyDisplay.textContent = `${num}!`;
                break;
            case 'reciprocal':
                if (num === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                result = 1 / num;
                historyDisplay.textContent = `1/${num}`;
                break;
            case 'mod':
                previousValue = currentValue;
                operation = 'mod';
                historyDisplay.textContent = `${previousValue} mod`;
                shouldResetDisplay = true;
                return;
            case 'floor':
                result = Math.floor(num);
                historyDisplay.textContent = `⌊${num}⌋`;
                break;
            case 'ceil':
                result = Math.ceil(num);
                historyDisplay.textContent = `⌈${num}⌉`;
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

// Percentage (for simple mode)
function percentage() {
    const num = parseFloat(currentValue);
    if (isNaN(num)) return;
    currentValue = (num / 100).toString();
    historyDisplay.textContent = `${num}%`;
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
            case 'mod':
                result = prev % current;
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

    // Percentage
    if (key === '%') {
        percentage();
    }
});

// Initialize
updateDisplay();
console.log('Advanced Calculator loaded successfully!');