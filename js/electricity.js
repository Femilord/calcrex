// ========================================
// ELECTRICITY.JS - Electrical Calculators
// ========================================

const ElectricityApp = {
    formulas: {
        'ohms-law-voltage': {
            label: 'V = IR (Ohm\'s Law - Voltage)',
            inputs: ['Current I (A)', 'Resistance R (Ω)'],
            calc: (v) => v[0] * v[1],
            unit: 'V',
            description: 'Calculate voltage from current and resistance'
        },
        'ohms-law-current': {
            label: 'I = V/R (Ohm\'s Law - Current)',
            inputs: ['Voltage V (V)', 'Resistance R (Ω)'],
            calc: (v) => v[0] / v[1],
            unit: 'A',
            description: 'Calculate current from voltage and resistance'
        },
        'ohms-law-resistance': {
            label: 'R = V/I (Ohm\'s Law - Resistance)',
            inputs: ['Voltage V (V)', 'Current I (A)'],
            calc: (v) => v[0] / v[1],
            unit: 'Ω',
            description: 'Calculate resistance from voltage and current'
        },
        'power-vi': {
            label: 'P = VI (Electric Power)',
            inputs: ['Voltage V (V)', 'Current I (A)'],
            calc: (v) => v[0] * v[1],
            unit: 'W',
            description: 'Power from voltage and current'
        },
        'power-ir': {
            label: 'P = I²R (Power Loss)',
            inputs: ['Current I (A)', 'Resistance R (Ω)'],
            calc: (v) => Math.pow(v[0], 2) * v[1],
            unit: 'W',
            description: 'Power dissipation in resistance'
        },
        'power-vr': {
            label: 'P = V²/R (Power from Voltage)',
            inputs: ['Voltage V (V)', 'Resistance R (Ω)'],
            calc: (v) => Math.pow(v[0], 2) / v[1],
            unit: 'W',
            description: 'Power from voltage and resistance'
        },
        'energy': {
            label: 'E = Pt (Electrical Energy)',
            inputs: ['Power P (W)', 'Time t (hours)'],
            calc: (v) => v[0] * v[1],
            unit: 'Wh',
            description: 'Energy consumption over time'
        },
        'energy-kwh': {
            label: 'E = Pt (Energy in kWh)',
            inputs: ['Power P (kW)', 'Time t (hours)'],
            calc: (v) => v[0] * v[1],
            unit: 'kWh',
            description: 'Energy consumption in kilowatt-hours'
        },
        'resistors-series': {
            label: 'R = R₁ + R₂ + R₃ (Series Resistors)',
            inputs: ['Resistor 1 (Ω)', 'Resistor 2 (Ω)', 'Resistor 3 (Ω)'],
            calc: (v) => v[0] + v[1] + v[2],
            unit: 'Ω',
            description: 'Total resistance in series'
        },
        'resistors-parallel-2': {
            label: '1/R = 1/R₁ + 1/R₂ (Parallel - 2 Resistors)',
            inputs: ['Resistor 1 (Ω)', 'Resistor 2 (Ω)'],
            calc: (v) => (v[0] * v[1]) / (v[0] + v[1]),
            unit: 'Ω',
            description: 'Total resistance of 2 resistors in parallel'
        },
        'resistors-parallel-3': {
            label: '1/R = 1/R₁ + 1/R₂ + 1/R₃ (Parallel - 3 Resistors)',
            inputs: ['Resistor 1 (Ω)', 'Resistor 2 (Ω)', 'Resistor 3 (Ω)'],
            calc: (v) => 1 / (1 / v[0] + 1 / v[1] + 1 / v[2]),
            unit: 'Ω',
            description: 'Total resistance of 3 resistors in parallel'
        },
        'capacitors-series': {
            label: '1/C = 1/C₁ + 1/C₂ (Series Capacitors)',
            inputs: ['Capacitor 1 (F)', 'Capacitor 2 (F)'],
            calc: (v) => (v[0] * v[1]) / (v[0] + v[1]),
            unit: 'F',
            description: 'Total capacitance in series'
        },
        'capacitors-parallel': {
            label: 'C = C₁ + C₂ + C₃ (Parallel Capacitors)',
            inputs: ['Capacitor 1 (F)', 'Capacitor 2 (F)', 'Capacitor 3 (F)'],
            calc: (v) => v[0] + v[1] + v[2],
            unit: 'F',
            description: 'Total capacitance in parallel'
        },
        'capacitive-reactance': {
            label: 'Xc = 1/(2πfC) (Capacitive Reactance)',
            inputs: ['Frequency f (Hz)', 'Capacitance C (F)'],
            calc: (v) => 1 / (2 * Math.PI * v[0] * v[1]),
            unit: 'Ω',
            description: 'Reactance of capacitor in AC circuit'
        },
        'inductive-reactance': {
            label: 'XL = 2πfL (Inductive Reactance)',
            inputs: ['Frequency f (Hz)', 'Inductance L (H)'],
            calc: (v) => 2 * Math.PI * v[0] * v[1],
            unit: 'Ω',
            description: 'Reactance of inductor in AC circuit'
        },
        'impedance-rc': {
            label: 'Z = √(R² + Xc²) (RC Impedance)',
            inputs: ['Resistance R (Ω)', 'Capacitive Reactance Xc (Ω)'],
            calc: (v) => Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2)),
            unit: 'Ω',
            description: 'Impedance of RC circuit'
        },
        'impedance-rl': {
            label: 'Z = √(R² + XL²) (RL Impedance)',
            inputs: ['Resistance R (Ω)', 'Inductive Reactance XL (Ω)'],
            calc: (v) => Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2)),
            unit: 'Ω',
            description: 'Impedance of RL circuit'
        },
        'power-factor': {
            label: 'PF = cos(φ) = R/Z (Power Factor)',
            inputs: ['Resistance R (Ω)', 'Impedance Z (Ω)'],
            calc: (v) => v[0] / v[1],
            unit: '',
            description: 'Power factor of AC circuit'
        },
        'voltage-divider': {
            label: 'Vout = Vin × (R2/(R1+R2)) (Voltage Divider)',
            inputs: ['Input Voltage Vin (V)', 'Resistor 1 R1 (Ω)', 'Resistor 2 R2 (Ω)'],
            calc: (v) => v[0] * (v[2] / (v[1] + v[2])),
            unit: 'V',
            description: 'Output voltage from voltage divider'
        },
        'current-divider': {
            label: 'I1 = Itotal × (R2/(R1+R2)) (Current Divider)',
            inputs: ['Total Current (A)', 'Resistor 1 R1 (Ω)', 'Resistor 2 R2 (Ω)'],
            calc: (v) => v[0] * (v[2] / (v[1] + v[2])),
            unit: 'A',
            description: 'Current through R1 in parallel circuit'
        },
        'wire-resistance': {
            label: 'R = ρL/A (Wire Resistance)',
            inputs: ['Resistivity ρ (Ω⋅m)', 'Length L (m)', 'Cross-section Area A (m²)'],
            calc: (v) => v[0] * v[1] / v[2],
            unit: 'Ω',
            description: 'Resistance of a wire'
        },
        'efficiency': {
            label: 'η = (Pout/Pin) × 100% (Efficiency)',
            inputs: ['Output Power (W)', 'Input Power (W)'],
            calc: (v) => (v[0] / v[1]) * 100,
            unit: '%',
            description: 'Efficiency of electrical device'
        },
        'transformer-ratio': {
            label: 'Vs/Vp = Ns/Np (Transformer)',
            inputs: ['Primary Voltage Vp (V)', 'Primary Turns Np', 'Secondary Turns Ns'],
            calc: (v) => v[0] * (v[2] / v[1]),
            unit: 'V',
            description: 'Secondary voltage of transformer'
        },
        'charge': {
            label: 'Q = It (Electric Charge)',
            inputs: ['Current I (A)', 'Time t (s)'],
            calc: (v) => v[0] * v[1],
            unit: 'C',
            description: 'Charge from current and time'
        },
        'capacitor-energy': {
            label: 'E = ½CV² (Capacitor Energy)',
            inputs: ['Capacitance C (F)', 'Voltage V (V)'],
            calc: (v) => 0.5 * v[0] * Math.pow(v[1], 2),
            unit: 'J',
            description: 'Energy stored in capacitor'
        },
        'inductor-energy': {
            label: 'E = ½LI² (Inductor Energy)',
            inputs: ['Inductance L (H)', 'Current I (A)'],
            calc: (v) => 0.5 * v[0] * Math.pow(v[1], 2),
            unit: 'J',
            description: 'Energy stored in inductor'
        },
        'time-constant-rc': {
            label: 'τ = RC (RC Time Constant)',
            inputs: ['Resistance R (Ω)', 'Capacitance C (F)'],
            calc: (v) => v[0] * v[1],
            unit: 's',
            description: 'Time constant of RC circuit'
        },
        'time-constant-rl': {
            label: 'τ = L/R (RL Time Constant)',
            inputs: ['Inductance L (H)', 'Resistance R (Ω)'],
            calc: (v) => v[0] / v[1],
            unit: 's',
            description: 'Time constant of RL circuit'
        },
        'resonance-frequency': {
            label: 'f = 1/(2π√(LC)) (Resonance Frequency)',
            inputs: ['Inductance L (H)', 'Capacitance C (F)'],
            calc: (v) => 1 / (2 * Math.PI * Math.sqrt(v[0] * v[1])),
            unit: 'Hz',
            description: 'Resonant frequency of LC circuit'
        },
        'three-phase-power': {
            label: 'P = √3 × VL × IL × PF (3-Phase Power)',
            inputs: ['Line Voltage VL (V)', 'Line Current IL (A)', 'Power Factor'],
            calc: (v) => Math.sqrt(3) * v[0] * v[1] * v[2],
            unit: 'W',
            description: 'Power in 3-phase system'
        },
        'electricity-cost': {
            label: 'Cost = Power × Time × Rate (Electricity Cost)',
            inputs: ['Power (kW)', 'Time (hours)', 'Rate ($/kWh)'],
            calc: (v) => v[0] * v[1] * v[2],
            unit: '$',
            description: 'Cost of electricity consumption'
        },
        'current-density': {
            label: 'J = I/A (Current Density)',
            inputs: ['Current I (A)', 'Cross-section Area A (m²)'],
            calc: (v) => v[0] / v[1],
            unit: 'A/m²',
            description: 'Current density in conductor'
        }
    },

    init() {
        this.changeFormula();
    },

    changeFormula() {
        const type = document.getElementById('electricity-type').value;
        const inputsContainer = document.getElementById('electricity-inputs');
        const formula = this.formulas[type];

        if (!inputsContainer || !formula) return;

        // Show formula description
        const descContainer = document.getElementById('electricity-description');
        if (descContainer) {
            descContainer.textContent = formula.description;
        }

        inputsContainer.innerHTML = '';
        formula.inputs.forEach((input, i) => {
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="elec-input-${i}">${input}:</label>
                <input type="text" id="elec-input-${i}" class="number-input" placeholder="Enter number">
            `;
            inputsContainer.appendChild(div);

            // Add input validation
            const inputElement = div.querySelector('input');
            inputElement.addEventListener('keypress', (e) => {
                const char = String.fromCharCode(e.which);
                if (!/[\d.e\-]/.test(char)) {
                    e.preventDefault();
                }
            });
        });

        const resultContainer = document.getElementById('electricity-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('electricity-type').value;
        const formula = this.formulas[type];
        const values = [];
        const inputs = document.querySelectorAll('#electricity-inputs input');

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            values.push(value);
        });

        const resultContainer = document.getElementById('electricity-result');
        if (!resultContainer) return;

        if (values.some(isNaN)) {
            resultContainer.textContent = 'Please fill all fields with valid numbers';
            resultContainer.style.color = '#ef4444';
            return;
        }

        const result = formula.calc(values);
        const unitText = formula.unit ? ` ${formula.unit}` : '';
        resultContainer.textContent = `Result: ${result.toFixed(6)}${unitText}`;
        resultContainer.style.color = '#3b82f6';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ElectricityApp.init();
});