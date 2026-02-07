// ========================================
// CALCULATOR STATE MANAGEMENT
// ========================================
class Calculator {
    constructor() {
        this.currentMode = 'basic';
        this.displayValue = '0';
        this.expression = '';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.angleMode = 'deg'; // deg or rad
        this.history = [];
        this.lastResult = null;

        this.initializeElements();
        this.attachEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        // Display elements
        this.displayEl = document.getElementById('display');
        this.expressionEl = document.getElementById('expression');
        this.memoryDisplayEl = document.getElementById('memoryDisplay');

        // Button containers
        this.basicButtonsEl = document.getElementById('basicButtons');
        this.scientificButtonsEl = document.getElementById('scientificButtons');
        this.advancedButtonsEl = document.getElementById('advancedButtons');

        // Quick access section (memory + conversion)
        this.quickAccessEl = document.querySelector('.quick-access-section');
        this.memorySectionEl = document.querySelector('.memory-section');
        this.conversionSectionEl = document.querySelector('.conversion-section');

        // Mode buttons
        this.modeBtns = document.querySelectorAll('.mode-btn');

        // History
        this.historyPanelEl = document.getElementById('historyPanel');
        this.historyListEl = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');

        // Container
        this.containerEl = document.querySelector('.calculator-container');
    }

    attachEventListeners() {
        // Mode switching
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Number and operator buttons
        this.basicButtonsEl.addEventListener('click', (e) => this.handleBasicButton(e));
        this.scientificButtonsEl.addEventListener('click', (e) => this.handleScientificButton(e));
        this.advancedButtonsEl.addEventListener('click', (e) => this.handleAdvancedButton(e));

        // Quick access section (memory + conversion)
        this.quickAccessEl.addEventListener('click', (e) => this.handleQuickAccessButton(e));

        // Clear history button
        if (this.clearHistoryBtn) {
            this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // ========================================
    // MODE SWITCHING
    // ========================================
    switchMode(mode) {
        this.currentMode = mode;

        // Update active button
        this.modeBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update container class
        this.containerEl.className = 'calculator-container';
        this.containerEl.classList.add(`${mode}-mode`);

        // Show/hide button sections
        this.scientificButtonsEl.style.display =
            (mode === 'scientific' || mode === 'advanced') ? 'grid' : 'none';
        this.advancedButtonsEl.style.display =
            mode === 'advanced' ? 'grid' : 'none';

        // Show/hide history panel (only in advanced mode)
        if (mode === 'advanced') {
            this.historyPanelEl.classList.add('active');
        } else {
            this.historyPanelEl.classList.remove('active');
        }

        // Update memory display visibility
        this.updateMemoryDisplay();
    }

    // ========================================
    // BUTTON HANDLERS
    // ========================================
    handleBasicButton(e) {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const action = btn.dataset.action;
        const value = btn.dataset.value;

        if (action === 'clear') {
            this.clear();
        } else if (action === 'delete') {
            this.delete();
        } else if (action === 'equals') {
            this.calculate();
        } else if (value) {
            if (value === '+/-') {
                this.negate();
            } else if (btn.classList.contains('operator')) {
                this.handleOperator(value);
            } else if (btn.classList.contains('number')) {
                this.inputDigit(value);
            }
        }
    }

    handleScientificButton(e) {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const func = btn.dataset.function;
        const value = btn.dataset.value;

        if (func) {
            this.applyFunction(func);
        } else if (value) {
            this.inputConstant(value);
        }
    }

    handleAdvancedButton(e) {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        // Handle clear history button
        if (btn.id === 'clearHistory') {
            this.clearHistory();
            return;
        }

        const func = btn.dataset.function;

        if (func) {
            this.applyFunction(func);
        }
    }

    handleQuickAccessButton(e) {
        const btn = e.target.closest('.btn');
        if (!btn) return;

        const memory = btn.dataset.memory;
        const convert = btn.dataset.convert;

        if (memory) {
            this.handleMemory(memory);
        } else if (convert) {
            this.toggleAngleMode(convert);
        }
    }

    // ========================================
    // INPUT HANDLING
    // ========================================
    inputDigit(digit) {
        if (this.waitingForOperand) {
            this.displayValue = String(digit);
            this.waitingForOperand = false;
        } else {
            if (digit === '.' && this.displayValue.includes('.')) return;
            this.displayValue = this.displayValue === '0' ?
                String(digit) : this.displayValue + digit;
        }
        this.updateDisplay();
    }

    inputConstant(constant) {
        const constants = {
            'pi': Math.PI,
            'e': Math.E
        };
        this.displayValue = String(constants[constant]);
        this.waitingForOperand = true;
        this.updateDisplay();
    }

    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.displayValue);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operator) {
            const result = this.performOperation(this.previousValue, inputValue, this.operator);
            this.displayValue = String(result);
            this.previousValue = result;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.expression = `${this.previousValue} ${this.getOperatorSymbol(nextOperator)}`;
        this.updateDisplay();
    }

    performOperation(first, second, operator) {
        switch (operator) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return second !== 0 ? first / second : 'Error';
            case '%': return first % second;
            default: return second;
        }
    }

    getOperatorSymbol(operator) {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷',
            '%': '%'
        };
        return symbols[operator] || operator;
    }

    // ========================================
    // CALCULATION
    // ========================================
    calculate() {
        if (!this.operator || this.waitingForOperand) return;

        const inputValue = parseFloat(this.displayValue);
        const result = this.performOperation(this.previousValue, inputValue, this.operator);

        const calculation = `${this.previousValue} ${this.getOperatorSymbol(this.operator)} ${inputValue}`;

        this.displayValue = String(result);
        this.expression = '';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = true;
        this.lastResult = result;

        // Add to history
        this.addToHistory(calculation, result);

        this.updateDisplay();
    }

    // ========================================
    // SCIENTIFIC FUNCTIONS
    // ========================================
    applyFunction(func) {
        const value = parseFloat(this.displayValue);
        let result;

        // Convert to radians if in degree mode for trig functions
        const toRad = (deg) => this.angleMode === 'deg' ? deg * (Math.PI / 180) : deg;
        const fromRad = (rad) => this.angleMode === 'deg' ? rad * (180 / Math.PI) : rad;

        try {
            switch (func) {
                // Trigonometric
                case 'sin': result = Math.sin(toRad(value)); break;
                case 'cos': result = Math.cos(toRad(value)); break;
                case 'tan': result = Math.tan(toRad(value)); break;
                case 'asin': result = fromRad(Math.asin(value)); break;
                case 'acos': result = fromRad(Math.acos(value)); break;
                case 'atan': result = fromRad(Math.atan(value)); break;

                // Hyperbolic
                case 'sinh': result = Math.sinh(value); break;
                case 'cosh': result = Math.cosh(value); break;
                case 'tanh': result = Math.tanh(value); break;

                // Logarithmic
                case 'log': result = Math.log10(value); break;
                case 'ln': result = Math.log(value); break;

                // Power and roots
                case 'sqrt': result = Math.sqrt(value); break;
                case 'cbrt': result = Math.cbrt(value); break;
                case 'exp': result = Math.exp(value); break;
                case 'pow':
                    this.operator = '^';
                    this.previousValue = value;
                    this.waitingForOperand = true;
                    this.expression = `${value} ^`;
                    this.updateDisplay();
                    return;

                // Other functions
                case 'factorial': result = this.factorial(value); break;
                case 'abs': result = Math.abs(value); break;
                case 'ceil': result = Math.ceil(value); break;
                case 'floor': result = Math.floor(value); break;
                case 'round': result = Math.round(value); break;
                case 'negate': result = -value; break;
                case 'random': result = Math.random(); break;

                // Special operations
                case 'gcd':
                case 'lcm':
                case 'mod':
                    this.operator = func;
                    this.previousValue = value;
                    this.waitingForOperand = true;
                    this.expression = `${value} ${func}`;
                    this.updateDisplay();
                    return;

                default: result = value;
            }

            this.displayValue = String(result);
            this.waitingForOperand = true;
            this.updateDisplay();
        } catch (error) {
            this.displayValue = 'Error';
            this.updateDisplay();
        }
    }

    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    gcd(a, b) {
        a = Math.abs(Math.floor(a));
        b = Math.abs(Math.floor(b));
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    lcm(a, b) {
        return Math.abs(a * b) / this.gcd(a, b);
    }

    negate() {
        this.displayValue = String(parseFloat(this.displayValue) * -1);
        this.updateDisplay();
    }

    // ========================================
    // MEMORY OPERATIONS
    // ========================================
    handleMemory(operation) {
        const value = parseFloat(this.displayValue);

        switch (operation) {
            case 'mc':
                this.memory = 0;
                break;
            case 'mr':
                this.displayValue = String(this.memory);
                this.waitingForOperand = true;
                break;
            case 'm+':
                this.memory += value;
                break;
            case 'm-':
                this.memory -= value;
                break;
            case 'ms':
                this.memory = value;
                break;
        }

        this.updateMemoryDisplay();
        this.updateDisplay();
    }

    updateMemoryDisplay() {
        if (this.memory !== 0) {
            this.memoryDisplayEl.textContent = `Memory: ${this.memory}`;
            this.memoryDisplayEl.classList.add('active');
        } else {
            this.memoryDisplayEl.classList.remove('active');
        }
    }

    // ========================================
    // ANGLE MODE
    // ========================================
    toggleAngleMode(mode) {
        this.angleMode = mode.toLowerCase();

        // Update button states
        document.querySelectorAll('.conversion').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-convert="${mode}"]`).classList.add('active');
    }

    // ========================================
    // HISTORY MANAGEMENT
    // ========================================
    addToHistory(calculation, result) {
        this.history.unshift({ calculation, result });
        if (this.history.length > 20) this.history.pop();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyListEl.innerHTML = '';
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="calculation">${item.calculation}</div>
                <div class="result">= ${item.result}</div>
            `;
            historyItem.addEventListener('click', () => {
                this.displayValue = String(item.result);
                this.updateDisplay();
            });
            this.historyListEl.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    clear() {
        this.displayValue = '0';
        this.expression = '';
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    delete() {
        if (this.displayValue.length > 1) {
            this.displayValue = this.displayValue.slice(0, -1);
        } else {
            this.displayValue = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        // Format the display value
        let displayText = this.displayValue;

        // Handle very long numbers - allow up to 20 characters before using exponential
        if (displayText.length > 20 && !displayText.includes('e')) {
            const num = parseFloat(displayText);
            // Only use exponential if it's actually a very large/small number
            if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-6 && num !== 0)) {
                displayText = num.toExponential(6);
            } else {
                // Truncate to 20 characters for display
                displayText = displayText.substring(0, 20);
            }
        }

        // Dynamically adjust font size based on length
        if (displayText.length > 15) {
            this.displayEl.setAttribute('data-length', 'very-long');
        } else if (displayText.length > 10) {
            this.displayEl.setAttribute('data-length', 'long');
        } else {
            this.displayEl.removeAttribute('data-length');
        }

        this.displayEl.textContent = displayText;
        this.expressionEl.textContent = this.expression;
    }

    // ========================================
    // KEYBOARD SUPPORT
    // ========================================
    handleKeyboard(e) {
        // Prevent default for calculator keys
        if (/^[0-9+\-*/.=]$/.test(e.key) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
            e.preventDefault();
        }

        // Numbers and decimal
        if (/^[0-9.]$/.test(e.key)) {
            this.inputDigit(e.key);
        }

        // Operators
        else if (e.key === '+') this.handleOperator('+');
        else if (e.key === '-') this.handleOperator('-');
        else if (e.key === '*') this.handleOperator('*');
        else if (e.key === '/') this.handleOperator('/');
        else if (e.key === '%') this.handleOperator('%');

        // Actions
        else if (e.key === 'Enter' || e.key === '=') this.calculate();
        else if (e.key === 'Backspace') this.delete();
        else if (e.key === 'Escape') this.clear();

        // Special functions with keyboard shortcuts
        else if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            this.applyFunction('sin');
        }
        else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            this.applyFunction('cos');
        }
        else if (e.key === 't' && e.ctrlKey) {
            e.preventDefault();
            this.applyFunction('tan');
        }
    }
}

// ========================================
// INITIALIZE CALCULATOR
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();

    // Set default angle mode to DEG
    document.querySelector('[data-convert="deg"]')?.classList.add('active');
});