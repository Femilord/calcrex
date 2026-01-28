// ========================================
// CALCULATOR.JS - Basic, Scientific, Advanced Calculator
// ========================================

const CalcApp = {
    displayElement: null,
    historyElement: null,
    buttonsContainer: null,
    currentValue: '0',
    previousValue: '',
    operator: null,
    mode: 'basic',
    waitingForNewValue: false,

    init() {
        // Get DOM elements
        this.displayElement = document.getElementById('calc-display');
        this.historyElement = document.getElementById('calc-history');
        this.buttonsContainer = document.getElementById('calc-buttons');

        if (!this.displayElement || !this.historyElement || !this.buttonsContainer) {
            console.error('Calculator elements not found');
            return;
        }

        this.switchMode('basic');
        this.setupKeyboard();
    },

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            // Only when calculator section is active
            if (document.activeElement.tagName === 'INPUT' &&
                document.activeElement !== this.displayElement) {
                return; // Don't interfere with other inputs
            }

            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                this.inputNumber(e.key);
            } else if (e.key === '.') {
                e.preventDefault();
                this.inputDecimal();
            } else if (e.key === '+') {
                e.preventDefault();
                this.inputOperator('+');
            } else if (e.key === '-') {
                e.preventDefault();
                this.inputOperator('-');
            } else if (e.key === '*') {
                e.preventDefault();
                this.inputOperator('*');
            } else if (e.key === '/') {
                e.preventDefault();
                this.inputOperator('/');
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculate();
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                this.backspace();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.clear();
            } else if (e.key === '%') {
                e.preventDefault();
                this.percentage();
            }
        });
    },

    updateDisplay() {
        if (this.displayElement) {
            this.displayElement.value = this.currentValue;
        }
    },

    inputNumber(num) {
        if (this.waitingForNewValue) {
            this.currentValue = num;
            this.waitingForNewValue = false;
        } else {
            this.currentValue = this.currentValue === '0' ? num : this.currentValue + num;
        }
        this.updateDisplay();
    },

    inputDecimal() {
        if (this.waitingForNewValue) {
            this.currentValue = '0.';
            this.waitingForNewValue = false;
        } else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    },

    inputOperator(op) {
        if (this.mode === 'basic') {
            const currentNum = parseFloat(this.currentValue);

            if (this.operator && !this.waitingForNewValue) {
                this.calculate();
            }

            this.previousValue = this.currentValue;
            this.operator = op;
            this.waitingForNewValue = true;

            const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
            this.historyElement.textContent = `${this.previousValue} ${symbols[op]}`;
        } else {
            // Scientific/Advanced mode - just append
            this.currentValue += op;
            this.updateDisplay();
        }
    },

    calculate() {
        if (this.mode === 'basic') {
            if (!this.operator) return;

            const prev = parseFloat(this.previousValue);
            const curr = parseFloat(this.currentValue);
            let result;

            switch (this.operator) {
                case '+': result = prev + curr; break;
                case '-': result = prev - curr; break;
                case '*': result = prev * curr; break;
                case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
                default: return;
            }

            const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
            this.historyElement.textContent = `${this.previousValue} ${symbols[this.operator]} ${this.currentValue} =`;
            this.currentValue = result.toString();
            this.operator = null;
            this.waitingForNewValue = true;
            this.updateDisplay();
        } else {
            // Scientific/Advanced mode
            try {
                const expression = this.currentValue
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/π/g, Math.PI)
                    .replace(/e/g, Math.E);
                const result = eval(expression);
                this.historyElement.textContent = `${this.currentValue} =`;
                this.currentValue = result.toString();
                this.updateDisplay();
            } catch (e) {
                this.currentValue = 'Error';
                this.updateDisplay();
            }
        }
    },

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForNewValue = false;
        this.historyElement.textContent = '';
        this.updateDisplay();
    },

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    },

    percentage() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    },

    applyFunction(fn) {
        const val = parseFloat(this.currentValue);
        const angleMode = document.querySelector('input[name="calc-angle"]:checked')?.value || 'deg';
        let result;

        const toRadians = (deg) => deg * (Math.PI / 180);

        switch (fn) {
            case 'sin':
                result = angleMode === 'deg' ? Math.sin(toRadians(val)) : Math.sin(val);
                break;
            case 'cos':
                result = angleMode === 'deg' ? Math.cos(toRadians(val)) : Math.cos(val);
                break;
            case 'tan':
                result = angleMode === 'deg' ? Math.tan(toRadians(val)) : Math.tan(val);
                break;
            case 'asin':
                result = angleMode === 'deg' ? Math.asin(val) * 180 / Math.PI : Math.asin(val);
                break;
            case 'acos':
                result = angleMode === 'deg' ? Math.acos(val) * 180 / Math.PI : Math.acos(val);
                break;
            case 'atan':
                result = angleMode === 'deg' ? Math.atan(val) * 180 / Math.PI : Math.atan(val);
                break;
            case 'log':
                result = Math.log10(val);
                break;
            case 'ln':
                result = Math.log(val);
                break;
            case 'sqrt':
                result = Math.sqrt(val);
                break;
            case 'cbrt':
                result = Math.cbrt(val);
                break;
            case 'pow2':
                result = Math.pow(val, 2);
                break;
            case 'pow3':
                result = Math.pow(val, 3);
                break;
            case 'exp':
                result = Math.exp(val);
                break;
            case 'abs':
                result = Math.abs(val);
                break;
            case 'factorial':
                result = this.factorial(val);
                break;
            case 'inv':
                result = 1 / val;
                break;
            case 'pi':
                this.currentValue = Math.PI.toString();
                this.updateDisplay();
                return;
            case 'e':
                this.currentValue = Math.E.toString();
                this.updateDisplay();
                return;
            case 'rand':
                this.currentValue = Math.random().toString();
                this.updateDisplay();
                return;
            case '(':
            case ')':
                this.currentValue += fn;
                this.updateDisplay();
                return;
        }

        if (result !== undefined && !isNaN(result)) {
            this.currentValue = result.toString();
            this.updateDisplay();
        }
    },

    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },

    switchMode(mode) {
        this.mode = mode;
        this.clear();

        const angleMode = document.getElementById('calc-angle-mode');
        const container = document.getElementById('calc-container');

        if (mode === 'basic') {
            angleMode.style.display = 'none';
            container.style.maxWidth = '400px';
            this.buttonsContainer.className = 'calc-buttons basic-grid';
            this.renderBasicButtons();
        } else if (mode === 'scientific') {
            angleMode.style.display = 'flex';
            container.style.maxWidth = '600px';
            this.buttonsContainer.className = 'calc-buttons scientific-grid';
            this.renderScientificButtons();
        } else if (mode === 'advanced') {
            angleMode.style.display = 'flex';
            container.style.maxWidth = '600px';
            this.buttonsContainer.className = 'calc-buttons advanced-grid';
            this.renderAdvancedButtons();
        }
    },

    renderBasicButtons() {
        this.buttonsContainer.innerHTML = `
            <button class="calc-btn func-btn" onclick="CalcApp.clear()" title="Clear (Esc)">C</button>
            <button class="calc-btn func-btn backspace-btn" onclick="CalcApp.backspace()" title="Backspace">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button class="calc-btn func-btn" onclick="CalcApp.percentage()">%</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('/')">÷</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('7')">7</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('8')">8</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('9')">9</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('*')">×</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('4')">4</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('5')">5</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('6')">6</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('-')">−</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('1')">1</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('2')">2</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('3')">3</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('+')">+</button>
            
            <button class="calc-btn num-btn span-2" onclick="CalcApp.inputNumber('0')">0</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputDecimal()">.</button>
            <button class="calc-btn equals-btn" onclick="CalcApp.calculate()">=</button>
        `;
    },

    renderScientificButtons() {
        this.buttonsContainer.innerHTML = `
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('sin')">sin</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('cos')">cos</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('tan')">tan</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('log')">log</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('ln')">ln</button>
            <button class="calc-btn func-btn" onclick="CalcApp.clear()">C</button>
            
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('asin')">sin⁻¹</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('acos')">cos⁻¹</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('atan')">tan⁻¹</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('sqrt')">√</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('pow2')">x²</button>
            <button class="calc-btn func-btn backspace-btn" onclick="CalcApp.backspace()" title="Backspace">
                <i class="fas fa-arrow-left"></i>
            </button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('7')">7</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('8')">8</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('9')">9</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('/')">÷</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('(')">(</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction(')')">)</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('4')">4</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('5')">5</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('6')">6</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('*')">×</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('pi')">π</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('e')">e</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('1')">1</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('2')">2</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('3')">3</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('-')">−</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('factorial')">n!</button>
            <button class="calc-btn func-btn" onclick="CalcApp.percentage()">%</button>
            
            <button class="calc-btn num-btn span-2" onclick="CalcApp.inputNumber('0')">0</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputDecimal()">.</button>
            <button class="calc-btn equals-btn span-2" onclick="CalcApp.calculate()">=</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('+')">+</button>
        `;
    },

    renderAdvancedButtons() {
        this.buttonsContainer.innerHTML = `
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('abs')">|x|</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('cbrt')">∛</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('exp')">e^x</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('inv')">1/x</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('rand')">RND</button>
            <button class="calc-btn func-btn" onclick="CalcApp.clear()">C</button>
            
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('sin')">sin</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('cos')">cos</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('tan')">tan</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('log')">log</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('ln')">ln</button>
            <button class="calc-btn func-btn backspace-btn" onclick="CalcApp.backspace()" title="Backspace">
                <i class="fas fa-arrow-left"></i>
            </button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('7')">7</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('8')">8</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('9')">9</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('/')">÷</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('(')">(</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction(')')">)</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('4')">4</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('5')">5</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('6')">6</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('*')">×</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('sqrt')">√</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('pow2')">x²</button>
            
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('1')">1</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('2')">2</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputNumber('3')">3</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('-')">−</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('pow3')">x³</button>
            <button class="calc-btn func-btn" onclick="CalcApp.applyFunction('factorial')">n!</button>
            
            <button class="calc-btn num-btn span-2" onclick="CalcApp.inputNumber('0')">0</button>
            <button class="calc-btn num-btn" onclick="CalcApp.inputDecimal()">.</button>
            <button class="calc-btn equals-btn span-2" onclick="CalcApp.calculate()">=</button>
            <button class="calc-btn operator-btn" onclick="CalcApp.inputOperator('+')">+</button>
        `;
    }
};

// Global function for mode switching
function switchCalcMode(mode) {
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    CalcApp.switchMode(mode);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    CalcApp.init();
});