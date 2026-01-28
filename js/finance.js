// ========================================
// FINANCE.JS - Finance Calculators
// ========================================

const FinanceApp = {
    types: {
        'simple-interest': {
            inputs: ['Principal (P)', 'Rate (% per year)', 'Time (years)'],
            calc: (v) => v[0] * v[1] * v[2] / 100,
            label: 'Simple Interest'
        },
        'compound-interest': {
            inputs: ['Principal (P)', 'Rate (% per year)', 'Time (years)', 'Compounds per year (n)'],
            calc: (v) => v[0] * Math.pow((1 + v[1] / 100 / v[3]), v[3] * v[2]) - v[0],
            label: 'Compound Interest'
        },
        loan: {
            inputs: ['Loan Amount', 'Annual Interest Rate (%)', 'Loan Term (months)'],
            calc: (v) => {
                const r = v[1] / 100 / 12;
                const n = v[2];
                return (v[0] * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            },
            label: 'Monthly Payment'
        },
        mortgage: {
            inputs: ['Home Price', 'Down Payment', 'Interest Rate (%)', 'Loan Term (years)'],
            calc: (v) => {
                const principal = v[0] - v[1];
                const r = v[2] / 100 / 12;
                const n = v[3] * 12;
                return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            },
            label: 'Monthly Payment'
        },
        investment: {
            inputs: ['Initial Investment', 'Final Value', 'Time Period (years)'],
            calc: (v) => ((v[1] - v[0]) / v[0]) * 100 / v[2],
            label: 'Annual Return (%)'
        },
        roi: {
            inputs: ['Gain from Investment', 'Cost of Investment'],
            calc: (v) => ((v[0] - v[1]) / v[1]) * 100,
            label: 'ROI (%)'
        },
        savings: {
            inputs: ['Monthly Deposit', 'Annual Interest Rate (%)', 'Years'],
            calc: (v) => {
                const r = v[1] / 100 / 12;
                const n = v[2] * 12;
                return v[0] * ((Math.pow(1 + r, n) - 1) / r);
            },
            label: 'Future Value'
        },
        discount: {
            inputs: ['Original Price', 'Discount (%)'],
            calc: (v) => v[0] - (v[0] * v[1] / 100),
            label: 'Final Price'
        },
        tip: {
            inputs: ['Bill Amount', 'Tip Percentage (%)'],
            calc: (v) => v[0] * v[1] / 100,
            label: 'Tip Amount'
        },
        percentage: {
            inputs: ['Number', 'Percentage (%)'],
            calc: (v) => v[0] * v[1] / 100,
            label: 'Result'
        }
    },

    init() {
        this.changeType();
    },

    changeType() {
        const type = document.getElementById('finance-type').value;
        const inputsContainer = document.getElementById('finance-inputs');
        const data = this.types[type];

        if (!inputsContainer || !data) return;

        inputsContainer.innerHTML = '';
        data.inputs.forEach((input, i) => {
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="finance-input-${i}">${input}:</label>
                <input type="text" id="finance-input-${i}" class="number-input" placeholder="Enter number">
            `;
            inputsContainer.appendChild(div);

            const inputElement = div.querySelector('input');
            inputElement.addEventListener('keypress', (e) => {
                const char = String.fromCharCode(e.which);
                if (!/[\d.e\-]/.test(char)) {
                    e.preventDefault();
                }
            });
        });

        const resultContainer = document.getElementById('finance-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('finance-type').value;
        const data = this.types[type];
        const values = [];
        const inputs = document.querySelectorAll('#finance-inputs input');

        inputs.forEach(input => {
            values.push(parseFloat(input.value));
        });

        const resultContainer = document.getElementById('finance-result');
        if (!resultContainer) return;

        if (values.some(isNaN)) {
            resultContainer.textContent = 'Please fill all fields with valid numbers';
            resultContainer.style.color = '#ef4444';
            return;
        }

        const result = data.calc(values);
        resultContainer.textContent = `${data.label}: ${result.toFixed(2)}`;
        resultContainer.style.color = '#3b82f6';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    FinanceApp.init();
});