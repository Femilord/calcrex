/* ========================================
   THERMODYNAMICS CALCULATOR - CalcREX
======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const calculators = {
        'heat-transfer': {
            title: 'Heat Transfer (Q = mcΔT)',
            formula: 'Q = m × c × ΔT',
            inputs: [
                { id: 'mass', label: 'Mass', symbol: 'm', unit: 'kg', placeholder: 'e.g. 2.5' },
                { id: 'specific-heat', label: 'Specific Heat Capacity', symbol: 'c', unit: 'J/(kg·K)', placeholder: 'e.g. 4186' },
                { id: 'temp-change', label: 'Temperature Change', symbol: 'ΔT', unit: '°C or K', placeholder: 'e.g. 25' }
            ],
            calculate: (vals) => {
                const q = vals[0] * vals[1] * vals[2];
                return { value: q.toFixed(2), unit: 'Joules (J)', explanation: `Heat energy = ${vals[0]} kg × ${vals[1]} J/(kg·K) × ${vals[2]} K. This is the energy needed to raise (or released by lowering) the temperature of the given mass by ΔT.` };
            }
        },
        'ideal-gas': {
            title: 'Ideal Gas Law (PV = nRT)',
            formula: 'PV = nRT → solve for any variable',
            inputs: [
                { id: 'pressure', label: 'Pressure', symbol: 'P', unit: 'Pa', placeholder: 'e.g. 101325' },
                { id: 'volume', label: 'Volume', symbol: 'V', unit: 'm³', placeholder: 'e.g. 0.0224' },
                { id: 'moles', label: 'Moles', symbol: 'n', unit: 'mol', placeholder: 'e.g. 1' },
                { id: 'temperature', label: 'Temperature', symbol: 'T', unit: 'K', placeholder: 'e.g. 273.15' }
            ],
            calculate: (vals) => {
                const R = 8.314;
                let missing = -1;
                for (let i = 0; i < vals.length; i++) { if (isNaN(vals[i]) || vals[i] === '') { missing = i; break; } }
                if (missing === -1) {
                    const lhs = vals[0] * vals[1];
                    const rhs = vals[2] * R * vals[3];
                    return { value: `PV = ${lhs.toFixed(2)}, nRT = ${rhs.toFixed(2)}`, unit: '', explanation: 'All values provided. Leave one blank to solve for it.' };
                }
                const names = ['Pressure (Pa)', 'Volume (m³)', 'Moles (mol)', 'Temperature (K)'];
                let result;
                switch (missing) {
                    case 0: result = (vals[2] * R * vals[3]) / vals[1]; break;
                    case 1: result = (vals[2] * R * vals[3]) / vals[0]; break;
                    case 2: result = (vals[0] * vals[1]) / (R * vals[3]); break;
                    case 3: result = (vals[0] * vals[1]) / (vals[2] * R); break;
                }
                return { value: result.toFixed(4), unit: names[missing], explanation: `Solved using PV = nRT with R = ${R} J/(mol·K). Leave one field blank to solve for it.` };
            }
        },
        'carnot-efficiency': {
            title: 'Carnot Efficiency',
            formula: 'η = 1 − (T_cold / T_hot)',
            inputs: [
                { id: 'temp-hot', label: 'Hot Reservoir Temperature', symbol: 'T_H', unit: 'K', placeholder: 'e.g. 600' },
                { id: 'temp-cold', label: 'Cold Reservoir Temperature', symbol: 'T_C', unit: 'K', placeholder: 'e.g. 300' }
            ],
            calculate: (vals) => {
                if (vals[0] <= vals[1]) return { value: 'Error', unit: '', explanation: 'T_hot must be greater than T_cold.' };
                const eff = (1 - vals[1] / vals[0]) * 100;
                return { value: eff.toFixed(2), unit: '%', explanation: `Carnot efficiency = 1 − (${vals[1]}/${vals[0]}) = ${eff.toFixed(2)}%. This is the maximum possible efficiency for any heat engine operating between these temperatures.` };
            }
        },
        'work-isothermal': {
            title: 'Isothermal Work (Ideal Gas)',
            formula: 'W = nRT × ln(V₂/V₁)',
            inputs: [
                { id: 'moles', label: 'Moles of Gas', symbol: 'n', unit: 'mol', placeholder: 'e.g. 1' },
                { id: 'temperature', label: 'Temperature', symbol: 'T', unit: 'K', placeholder: 'e.g. 300' },
                { id: 'v1', label: 'Initial Volume', symbol: 'V₁', unit: 'm³', placeholder: 'e.g. 0.01' },
                { id: 'v2', label: 'Final Volume', symbol: 'V₂', unit: 'm³', placeholder: 'e.g. 0.02' }
            ],
            calculate: (vals) => {
                const R = 8.314;
                const w = vals[0] * R * vals[1] * Math.log(vals[3] / vals[2]);
                return { value: w.toFixed(2), unit: 'Joules (J)', explanation: `W = ${vals[0]} × 8.314 × ${vals[1]} × ln(${vals[3]}/${vals[2]}). Positive W means work done BY the gas (expansion).` };
            }
        },
        'entropy-change': {
            title: 'Entropy Change',
            formula: 'ΔS = Q / T',
            inputs: [
                { id: 'heat', label: 'Heat Transferred', symbol: 'Q', unit: 'J', placeholder: 'e.g. 5000' },
                { id: 'temperature', label: 'Temperature', symbol: 'T', unit: 'K', placeholder: 'e.g. 300' }
            ],
            calculate: (vals) => {
                const ds = vals[0] / vals[1];
                return { value: ds.toFixed(4), unit: 'J/K', explanation: `ΔS = ${vals[0]} / ${vals[1]} = ${ds.toFixed(4)} J/K. Positive ΔS means entropy increased (process tends toward disorder).` };
            }
        },
        'thermal-expansion': {
            title: 'Linear Thermal Expansion',
            formula: 'ΔL = α × L₀ × ΔT',
            inputs: [
                { id: 'coeff', label: 'Expansion Coefficient', symbol: 'α', unit: '/°C', placeholder: 'e.g. 12e-6' },
                { id: 'length', label: 'Original Length', symbol: 'L₀', unit: 'm', placeholder: 'e.g. 1' },
                { id: 'temp-change', label: 'Temperature Change', symbol: 'ΔT', unit: '°C', placeholder: 'e.g. 50' }
            ],
            calculate: (vals) => {
                const dl = vals[0] * vals[1] * vals[2];
                return { value: (dl * 1000).toFixed(4), unit: 'mm', explanation: `ΔL = ${vals[0]} × ${vals[1]} × ${vals[2]} = ${dl.toExponential(4)} m = ${(dl * 1000).toFixed(4)} mm.` };
            }
        },
        'heat-conduction': {
            title: "Fourier's Law (Heat Conduction)",
            formula: 'Q̇ = kA(T₁ − T₂) / d',
            inputs: [
                { id: 'conductivity', label: 'Thermal Conductivity', symbol: 'k', unit: 'W/(m·K)', placeholder: 'e.g. 0.6' },
                { id: 'area', label: 'Cross-Section Area', symbol: 'A', unit: 'm²', placeholder: 'e.g. 1' },
                { id: 'temp-diff', label: 'Temperature Difference', symbol: 'ΔT', unit: 'K', placeholder: 'e.g. 20' },
                { id: 'thickness', label: 'Material Thickness', symbol: 'd', unit: 'm', placeholder: 'e.g. 0.1' }
            ],
            calculate: (vals) => {
                const q = vals[0] * vals[1] * vals[2] / vals[3];
                return { value: q.toFixed(2), unit: 'Watts (W)', explanation: `Heat flow rate = ${vals[0]} × ${vals[1]} × ${vals[2]} / ${vals[3]} = ${q.toFixed(2)} W. Higher k = better conductor.` };
            }
        },
        'stefan-boltzmann': {
            title: 'Stefan-Boltzmann Radiation',
            formula: 'P = εσAT⁴',
            inputs: [
                { id: 'emissivity', label: 'Emissivity', symbol: 'ε', unit: '0-1', placeholder: 'e.g. 0.95' },
                { id: 'area', label: 'Surface Area', symbol: 'A', unit: 'm²', placeholder: 'e.g. 1' },
                { id: 'temperature', label: 'Temperature', symbol: 'T', unit: 'K', placeholder: 'e.g. 373' }
            ],
            calculate: (vals) => {
                const sigma = 5.67e-8;
                const p = vals[0] * sigma * vals[1] * Math.pow(vals[2], 4);
                return { value: p.toFixed(2), unit: 'Watts (W)', explanation: `P = ${vals[0]} × 5.67×10⁻⁸ × ${vals[1]} × ${vals[2]}⁴ = ${p.toFixed(2)} W. σ (Stefan-Boltzmann constant) = 5.67 × 10⁻⁸ W/(m²·K⁴).` };
            }
        }
    };

    const categories = {
        'heat-transfer': ['heat-transfer', 'heat-conduction'],
        'gas-laws': ['ideal-gas', 'work-isothermal'],
        'engines': ['carnot-efficiency', 'entropy-change'],
        'materials': ['thermal-expansion', 'stefan-boltzmann']
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
            opt.value = k;
            opt.textContent = calculators[k].title;
            select.appendChild(opt);
        });
        if (keys.length > 0) loadCalculator(keys[0]);
    }

    function loadCalculator(key) {
        const calc = calculators[key];
        if (!calc) return;
        currentCalc = key;
        titleEl.textContent = calc.title;
        formulaEl.textContent = calc.formula;
        inputsEl.innerHTML = '';
        calc.inputs.forEach(inp => {
            const group = document.createElement('div');
            group.className = 'input-group';
            group.innerHTML = `
                <label class="input-label"><span class="input-symbol">${inp.symbol}</span> ${inp.label}</label>
                <div class="input-wrapper">
                    <input type="number" step="any" class="thermo-input" id="input-${inp.id}" placeholder="${inp.placeholder}">
                    <span class="input-unit">${inp.unit}</span>
                </div>`;
            inputsEl.appendChild(group);
        });
        resultEl.textContent = '-';
        unitEl.textContent = '';
        explainEl.textContent = '';
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            populateSelect(btn.dataset.category);
        });
    });

    select.addEventListener('change', () => loadCalculator(select.value));

    calcBtn.addEventListener('click', () => {
        if (!currentCalc) return;
        const calc = calculators[currentCalc];
        const vals = calc.inputs.map(inp => {
            const el = document.getElementById('input-' + inp.id);
            return el.value === '' ? '' : parseFloat(el.value);
        });
        const result = calc.calculate(vals);
        resultEl.textContent = result.value;
        unitEl.textContent = result.unit;
        explainEl.textContent = result.explanation;
    });

    populateSelect('heat-transfer');
});