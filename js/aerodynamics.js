/* ========================================
   AERODYNAMICS CALCULATOR - CalcREX
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        'lift': {
            title: 'Lift Force',
            formula: 'L = ½ρv²SC_L',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225 (sea level)' },
                { id: 'velocity', label: 'Airspeed', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 70' },
                { id: 'area', label: 'Wing Area', symbol: 'S', unit: 'm²', placeholder: 'e.g. 16' },
                { id: 'cl', label: 'Lift Coefficient', symbol: 'C_L', unit: '', placeholder: 'e.g. 1.2' }
            ],
            calculate: (v) => {
                const L = 0.5 * v[0] * v[1] * v[1] * v[2] * v[3];
                return { value: L.toFixed(2), unit: 'Newtons (N)', explanation: `Lift = ½ × ${v[0]} × ${v[1]}² × ${v[2]} × ${v[3]} = ${L.toFixed(2)} N. Divide by 9.81 for kgf, or by 4.448 for lbf.` };
            }
        },
        'drag': {
            title: 'Drag Force',
            formula: 'D = ½ρv²SC_D',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'velocity', label: 'Airspeed', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 70' },
                { id: 'area', label: 'Reference Area', symbol: 'S', unit: 'm²', placeholder: 'e.g. 16' },
                { id: 'cd', label: 'Drag Coefficient', symbol: 'C_D', unit: '', placeholder: 'e.g. 0.03' }
            ],
            calculate: (v) => {
                const D = 0.5 * v[0] * v[1] * v[1] * v[2] * v[3];
                return { value: D.toFixed(2), unit: 'Newtons (N)', explanation: `Drag = ½ρv²SC_D. This force opposes motion. Power to overcome drag: P = D × v = ${(D * v[1]).toFixed(0)} W.` };
            }
        },
        'dynamic-pressure': {
            title: 'Dynamic Pressure',
            formula: 'q = ½ρv²',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'velocity', label: 'Airspeed', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 100' }
            ],
            calculate: (v) => {
                const q = 0.5 * v[0] * v[1] * v[1];
                return { value: q.toFixed(2), unit: 'Pascals (Pa)', explanation: `q = ½ × ${v[0]} × ${v[1]}² = ${q.toFixed(2)} Pa. This is the kinetic energy per unit volume of airflow, fundamental to all aero force calculations.` };
            }
        },
        'reynolds': {
            title: 'Reynolds Number',
            formula: 'Re = ρvL/μ',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'velocity', label: 'Velocity', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 50' },
                { id: 'length', label: 'Characteristic Length', symbol: 'L', unit: 'm', placeholder: 'e.g. 1.5' },
                { id: 'viscosity', label: 'Dynamic Viscosity', symbol: 'μ', unit: 'Pa·s', placeholder: '1.81e-5' }
            ],
            calculate: (v) => {
                const Re = v[0] * v[1] * v[2] / v[3];
                let flow = Re < 5e5 ? 'Laminar' : Re < 1e6 ? 'Transitional' : 'Turbulent';
                return { value: Re.toExponential(3), unit: `(${flow} flow)`, explanation: `Re = ${v[0]} × ${v[1]} × ${v[2]} / ${v[3]} = ${Re.toExponential(3)}. Re < 5×10⁵ = laminar, > 10⁶ = turbulent.` };
            }
        },
        'mach': {
            title: 'Mach Number',
            formula: 'M = v / a, a = √(γRT)',
            inputs: [
                { id: 'velocity', label: 'Airspeed', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 250' },
                { id: 'temperature', label: 'Air Temperature', symbol: 'T', unit: 'K', placeholder: '288.15 (15°C)' }
            ],
            calculate: (v) => {
                const gamma = 1.4, R = 287;
                const a = Math.sqrt(gamma * R * v[1]);
                const M = v[0] / a;
                let regime = M < 0.8 ? 'Subsonic' : M < 1.2 ? 'Transonic' : M < 5 ? 'Supersonic' : 'Hypersonic';
                return { value: M.toFixed(4), unit: `Mach (${regime})`, explanation: `Speed of sound a = √(1.4 × 287 × ${v[1]}) = ${a.toFixed(1)} m/s. Mach = ${v[0]}/${a.toFixed(1)} = ${M.toFixed(4)}.` };
            }
        },
        'bernoulli': {
            title: 'Bernoulli Equation (Pressure)',
            formula: 'P₁ + ½ρv₁² = P₂ + ½ρv₂²',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'p1', label: 'Static Pressure 1', symbol: 'P₁', unit: 'Pa', placeholder: 'e.g. 101325' },
                { id: 'v1', label: 'Velocity 1', symbol: 'v₁', unit: 'm/s', placeholder: 'e.g. 0' },
                { id: 'v2', label: 'Velocity 2', symbol: 'v₂', unit: 'm/s', placeholder: 'e.g. 50' }
            ],
            calculate: (v) => {
                const P2 = v[1] + 0.5 * v[0] * (v[2] * v[2] - v[3] * v[3]);
                return { value: P2.toFixed(2), unit: 'Pa (P₂)', explanation: `P₂ = P₁ + ½ρ(v₁² − v₂²). As velocity increases, pressure decreases — this is how wings generate lift.` };
            }
        },
        'stall-speed': {
            title: 'Stall Speed',
            formula: 'V_stall = √(2W / ρSC_Lmax)',
            inputs: [
                { id: 'weight', label: 'Aircraft Weight', symbol: 'W', unit: 'N', placeholder: 'e.g. 9810' },
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'area', label: 'Wing Area', symbol: 'S', unit: 'm²', placeholder: 'e.g. 16' },
                { id: 'clmax', label: 'Max Lift Coefficient', symbol: 'C_Lmax', unit: '', placeholder: 'e.g. 1.6' }
            ],
            calculate: (v) => {
                const Vs = Math.sqrt(2 * v[0] / (v[1] * v[2] * v[3]));
                const knots = Vs * 1.944;
                return { value: Vs.toFixed(2), unit: `m/s (${knots.toFixed(1)} knots)`, explanation: `Below this speed, the wing cannot generate enough lift to support the aircraft weight. Stall speed increases with weight and altitude.` };
            }
        },
        'wind-load': {
            title: 'Wind Load on Structure',
            formula: 'F = ½ρv²C_DA',
            inputs: [
                { id: 'density', label: 'Air Density', symbol: 'ρ', unit: 'kg/m³', placeholder: '1.225' },
                { id: 'velocity', label: 'Wind Speed', symbol: 'v', unit: 'm/s', placeholder: 'e.g. 30' },
                { id: 'cd', label: 'Drag Coefficient', symbol: 'C_D', unit: '', placeholder: 'e.g. 2.0 (flat plate)' },
                { id: 'area', label: 'Exposed Area', symbol: 'A', unit: 'm²', placeholder: 'e.g. 50' }
            ],
            calculate: (v) => {
                const F = 0.5 * v[0] * v[1] * v[1] * v[2] * v[3];
                const kN = F / 1000;
                return { value: F.toFixed(2), unit: `N (${kN.toFixed(2)} kN)`, explanation: `Wind force on a structure. At ${v[1]} m/s (${(v[1] * 3.6).toFixed(0)} km/h), the pressure is ${(0.5 * v[0] * v[1] * v[1]).toFixed(0)} Pa over ${v[3]} m².` };
            }
        }
    };

    const categories = {
        'forces': ['lift', 'drag', 'wind-load'],
        'flow': ['dynamic-pressure', 'reynolds', 'bernoulli'],
        'flight': ['mach', 'stall-speed']
    };

    const catBtns = document.querySelectorAll('.category-btn');
    const select = document.getElementById('calculatorSelect');
    const titleEl = document.getElementById('calculatorTitle');
    const formulaEl = document.getElementById('formulaEquation');
    const inputsEl = document.getElementById('inputFields');
    const calcBtn = document.getElementById('calculateBtn');
    const resultEl = document.getElementById('resultValue');
    const unitEl = document.getElementById('resultUnit');
    const explainEl = document.getElementById('explanationText');
    let currentCalc = null;

    function populateSelect(catKey) {
        select.innerHTML = '';
        const keys = categories[catKey] || [];
        keys.forEach(k => {
            const opt = document.createElement('option');
            opt.value = k; opt.textContent = calculators[k].title;
            select.appendChild(opt);
        });
        if (keys.length) loadCalculator(keys[0]);
    }

    function loadCalculator(key) {
        const calc = calculators[key]; if (!calc) return;
        currentCalc = key; titleEl.textContent = calc.title; formulaEl.textContent = calc.formula;
        inputsEl.innerHTML = '';
        calc.inputs.forEach(inp => {
            const g = document.createElement('div'); g.className = 'input-group';
            g.innerHTML = `<label class="input-label"><span class="input-symbol">${inp.symbol}</span> ${inp.label}</label><div class="input-wrapper"><input type="number" step="any" class="aero-input" id="input-${inp.id}" placeholder="${inp.placeholder}"><span class="input-unit">${inp.unit}</span></div>`;
            inputsEl.appendChild(g);
        });
        resultEl.textContent = '-'; unitEl.textContent = ''; explainEl.textContent = '';
    }

    catBtns.forEach(btn => { btn.addEventListener('click', () => { catBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); populateSelect(btn.dataset.category); }); });
    select.addEventListener('change', () => loadCalculator(select.value));
    calcBtn.addEventListener('click', () => {
        if (!currentCalc) return;
        const calc = calculators[currentCalc];
        const vals = calc.inputs.map(inp => parseFloat(document.getElementById('input-' + inp.id).value));
        if (vals.some(v => isNaN(v))) { resultEl.textContent = 'Please fill all fields'; return; }
        const r = calc.calculate(vals);
        resultEl.textContent = r.value; unitEl.textContent = r.unit; explainEl.textContent = r.explanation;
    });
    populateSelect('forces');
});