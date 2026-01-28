// ========================================
// PHYSICS.JS - Physics Calculators
// ========================================

const PhysicsApp = {
    formulas: {
        // KINEMATICS
        velocity: {
            label: 'v = u + at',
            inputs: ['Initial Velocity u (m/s)', 'Acceleration a (m/s²)', 'Time t (s)'],
            calc: (v) => v[0] + v[1] * v[2],
            unit: 'm/s'
        },
        displacement: {
            label: 's = ut + ½at²',
            inputs: ['Initial Velocity u (m/s)', 'Acceleration a (m/s²)', 'Time t (s)'],
            calc: (v) => v[0] * v[2] + 0.5 * v[1] * Math.pow(v[2], 2),
            unit: 'm'
        },
        'velocity-squared': {
            label: 'v² = u² + 2as',
            inputs: ['Initial Velocity u (m/s)', 'Acceleration a (m/s²)', 'Displacement s (m)'],
            calc: (v) => Math.sqrt(Math.pow(v[0], 2) + 2 * v[1] * v[2]),
            unit: 'm/s'
        },

        // DYNAMICS
        force: {
            label: 'F = ma',
            inputs: ['Mass m (kg)', 'Acceleration a (m/s²)'],
            calc: (v) => v[0] * v[1],
            unit: 'N'
        },
        momentum: {
            label: 'p = mv',
            inputs: ['Mass m (kg)', 'Velocity v (m/s)'],
            calc: (v) => v[0] * v[1],
            unit: 'kg⋅m/s'
        },
        impulse: {
            label: 'J = FΔt',
            inputs: ['Force F (N)', 'Time Δt (s)'],
            calc: (v) => v[0] * v[1],
            unit: 'N⋅s'
        },

        // ENERGY & WORK
        work: {
            label: 'W = Fd',
            inputs: ['Force F (N)', 'Distance d (m)'],
            calc: (v) => v[0] * v[1],
            unit: 'J'
        },
        power: {
            label: 'P = W/t',
            inputs: ['Work W (J)', 'Time t (s)'],
            calc: (v) => v[0] / v[1],
            unit: 'W'
        },
        kinetic: {
            label: 'KE = ½mv²',
            inputs: ['Mass m (kg)', 'Velocity v (m/s)'],
            calc: (v) => 0.5 * v[0] * Math.pow(v[1], 2),
            unit: 'J'
        },
        potential: {
            label: 'PE = mgh',
            inputs: ['Mass m (kg)', 'Gravity g (9.8 m/s²)', 'Height h (m)'],
            calc: (v) => v[0] * v[1] * v[2],
            unit: 'J'
        },

        // WAVES & OPTICS
        'wave-speed': {
            label: 'v = fλ',
            inputs: ['Frequency f (Hz)', 'Wavelength λ (m)'],
            calc: (v) => v[0] * v[1],
            unit: 'm/s'
        },
        lens: {
            label: '1/f = 1/v + 1/u',
            inputs: ['Object Distance u (cm)', 'Image Distance v (cm)'],
            calc: (v) => 1 / (1 / v[0] + 1 / v[1]),
            unit: 'cm'
        },

        // THERMODYNAMICS
        'heat-energy': {
            label: 'Q = mcΔT (Heat Energy)',
            inputs: ['Mass m (kg)', 'Specific Heat c (J/kg⋅K)', 'Temperature Change ΔT (K)'],
            calc: (v) => v[0] * v[1] * v[2],
            unit: 'J'
        },

        // GRAVITY
        'gravitational-force': {
            label: 'F = GMm/r² (Newton\'s Law of Gravitation)',
            inputs: ['Mass 1 M (kg)', 'Mass 2 m (kg)', 'Distance r (m)'],
            calc: (v) => (6.674e-11 * v[0] * v[1]) / Math.pow(v[2], 2),
            unit: 'N'
        },

        // CIRCULAR MOTION
        'centripetal-force': {
            label: 'F = mv²/r (Centripetal Force)',
            inputs: ['Mass m (kg)', 'Velocity v (m/s)', 'Radius r (m)'],
            calc: (v) => (v[0] * Math.pow(v[1], 2)) / v[2],
            unit: 'N'
        },
        'angular-velocity': {
            label: 'ω = v/r (Angular Velocity)',
            inputs: ['Linear Velocity v (m/s)', 'Radius r (m)'],
            calc: (v) => v[0] / v[1],
            unit: 'rad/s'
        }
    },

    init() {
        this.changeFormula();
    },

    changeFormula() {
        const type = document.getElementById('physics-type').value;
        const inputsContainer = document.getElementById('physics-inputs');
        const formula = this.formulas[type];

        if (!inputsContainer || !formula) return;

        inputsContainer.innerHTML = '';
        formula.inputs.forEach((input, i) => {
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="phys-input-${i}">${input}:</label>
                <input type="text" id="phys-input-${i}" class="number-input" placeholder="Enter number">
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

        const resultContainer = document.getElementById('physics-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('physics-type').value;
        const formula = this.formulas[type];
        const values = [];
        const inputs = document.querySelectorAll('#physics-inputs input');

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            values.push(value);
        });

        const resultContainer = document.getElementById('physics-result');
        if (!resultContainer) return;

        if (values.some(isNaN)) {
            resultContainer.textContent = 'Please fill all fields with valid numbers';
            resultContainer.style.color = '#ef4444';
            return;
        }

        const result = formula.calc(values);
        resultContainer.textContent = `Result: ${result.toFixed(4)} ${formula.unit}`;
        resultContainer.style.color = '#3b82f6';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PhysicsApp.init();
});