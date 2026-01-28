// ========================================
// CHEMISTRY.JS - Chemistry Calculators
// ========================================

const ChemistryApp = {
    types: {
        molarity: {
            inputs: ['Moles of Solute (mol)', 'Volume of Solution (L)'],
            calc: (v) => v[0] / v[1],
            label: 'Molarity (M)'
        },
        dilution: {
            inputs: ['Initial Molarity M₁ (M)', 'Initial Volume V₁ (L)', 'Final Volume V₂ (L)'],
            calc: (v) => (v[0] * v[1]) / v[2],
            label: 'Final Molarity M₂ (M)'
        },
        'molecular-weight': {
            inputs: ['Total Mass (g)', 'Number of Moles (mol)'],
            calc: (v) => v[0] / v[1],
            label: 'Molecular Weight (g/mol)'
        },
        'percent-composition': {
            inputs: ['Mass of Element (g)', 'Total Mass (g)'],
            calc: (v) => (v[0] / v[1]) * 100,
            label: 'Percent Composition (%)'
        },
        'ideal-gas': {
            inputs: ['Pressure P (atm)', 'Volume V (L)', 'Temperature T (K)'],
            calc: (v) => (v[0] * v[1]) / (0.0821 * v[2]),
            label: 'Moles n (mol)'
        },
        ph: {
            inputs: ['H⁺ Concentration (mol/L)'],
            calc: (v) => -Math.log10(v[0]),
            label: 'pH'
        },
        density: {
            inputs: ['Mass (g)', 'Volume (mL)'],
            calc: (v) => v[0] / v[1],
            label: 'Density (g/mL)'
        },
        'percent-yield': {
            inputs: ['Actual Yield (g)', 'Theoretical Yield (g)'],
            calc: (v) => (v[0] / v[1]) * 100,
            label: 'Percent Yield (%)'
        }
    },

    init() {
        this.changeType();
    },

    changeType() {
        const type = document.getElementById('chem-type').value;
        const inputsContainer = document.getElementById('chem-inputs');
        const data = this.types[type];

        if (!inputsContainer || !data) return;

        inputsContainer.innerHTML = '';
        data.inputs.forEach((input, i) => {
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="chem-input-${i}">${input}:</label>
                <input type="text" id="chem-input-${i}" class="number-input" placeholder="Enter number">
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

        const resultContainer = document.getElementById('chem-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('chem-type').value;
        const data = this.types[type];
        const values = [];
        const inputs = document.querySelectorAll('#chem-inputs input');

        inputs.forEach(input => {
            values.push(parseFloat(input.value));
        });

        const resultContainer = document.getElementById('chem-result');
        if (!resultContainer) return;

        if (values.some(isNaN)) {
            resultContainer.textContent = 'Please fill all fields with valid numbers';
            resultContainer.style.color = '#ef4444';
            return;
        }

        const result = data.calc(values);
        resultContainer.textContent = `${data.label}: ${result.toFixed(4)}`;
        resultContainer.style.color = '#3b82f6';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ChemistryApp.init();
});