// ========================================
// Physics Calculators JavaScript
// ========================================

console.log("JavaScript is connected!");

// Show specific physics category
function showPhysicsCategory(category) {
    // Hide all categories
    document.querySelectorAll('.physics-category').forEach(cat => {
        cat.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.physics-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected category
    document.getElementById(category).classList.add('active');

    // Add active class to clicked tab
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

// ========================================
// KINEMATICS CALCULATORS
// ========================================

// Velocity Calculator
function calculateVelocity() {
    const distance = parseFloat(document.getElementById('vel_distance').value);
    const time = parseFloat(document.getElementById('vel_time').value);
    const distUnit = document.getElementById('vel_distance_unit').value;
    const timeUnit = document.getElementById('vel_time_unit').value;

    if (isNaN(distance) || isNaN(time) || time === 0) {
        showError('vel_result', 'Please enter valid distance and time values');
        return;
    }

    // Convert to standard units (m, s)
    let distInMeters = convertToMeters(distance, distUnit);
    let timeInSeconds = convertToSeconds(time, timeUnit);

    // Calculate velocity
    const velocity = distInMeters / timeInSeconds;

    // Display result
    showResult('vel_result', {
        title: 'Velocity',
        value: `${velocity.toFixed(4)} m/s`,
        details: [
            `Also equals: ${(velocity * 3.6).toFixed(4)} km/h`,
            `Or: ${(velocity * 2.23694).toFixed(4)} mph`,
            `Formula used: v = d/t`,
            `Calculation: ${distance} ${distUnit} ÷ ${time} ${timeUnit}`
        ]
    });
}

// Acceleration Calculator
function calculateAcceleration() {
    const v0 = parseFloat(document.getElementById('acc_initial_vel').value);
    const v = parseFloat(document.getElementById('acc_final_vel').value);
    const t = parseFloat(document.getElementById('acc_time').value);

    if (isNaN(v0) || isNaN(v) || isNaN(t) || t === 0) {
        showError('acc_result', 'Please enter valid values');
        return;
    }

    // Calculate acceleration
    const acceleration = (v - v0) / t;

    // Display result
    showResult('acc_result', {
        title: 'Acceleration',
        value: `${acceleration.toFixed(4)} m/s²`,
        details: [
            `Velocity change: ${(v - v0).toFixed(4)} m/s`,
            `Time interval: ${t} s`,
            `Formula used: a = (v - v₀)/t`,
            acceleration > 0 ? 'Object is speeding up' : 'Object is slowing down'
        ]
    });
}

// Displacement Calculator
function calculateDisplacement() {
    const v0 = parseFloat(document.getElementById('disp_initial_vel').value);
    const t = parseFloat(document.getElementById('disp_time').value);
    const a = parseFloat(document.getElementById('disp_acceleration').value);

    if (isNaN(v0) || isNaN(t) || isNaN(a)) {
        showError('disp_result', 'Please enter valid values');
        return;
    }

    // Calculate displacement: s = v₀t + ½at²
    const displacement = (v0 * t) + (0.5 * a * t * t);
    const finalVelocity = v0 + (a * t);

    // Display result
    showResult('disp_result', {
        title: 'Displacement',
        value: `${displacement.toFixed(4)} m`,
        details: [
            `Final velocity: ${finalVelocity.toFixed(4)} m/s`,
            `Formula used: s = v₀t + ½at²`,
            `Calculation: (${v0} × ${t}) + (0.5 × ${a} × ${t}²)`,
            `Distance covered in ${t} seconds`
        ]
    });
}

// ========================================
// DYNAMICS CALCULATORS
// ========================================

// Force Calculator (F = ma)
function calculateForce() {
    const mass = parseFloat(document.getElementById('force_mass').value);
    const acceleration = parseFloat(document.getElementById('force_acceleration').value);

    if (isNaN(mass) || isNaN(acceleration)) {
        showError('force_result', 'Please enter valid mass and acceleration');
        return;
    }

    // Calculate force
    const force = mass * acceleration;

    // Display result
    showResult('force_result', {
        title: 'Force (Newton\'s 2nd Law)',
        value: `${force.toFixed(4)} N (Newtons)`,
        details: [
            `Mass: ${mass} kg`,
            `Acceleration: ${acceleration} m/s²`,
            `Formula used: F = ma`,
            `1 Newton = 1 kg⋅m/s²`
        ]
    });
}

// Work Calculator
function calculateWork() {
    const force = parseFloat(document.getElementById('work_force').value);
    const distance = parseFloat(document.getElementById('work_distance').value);
    const angle = parseFloat(document.getElementById('work_angle').value) || 0;

    if (isNaN(force) || isNaN(distance)) {
        showError('work_result', 'Please enter valid force and distance');
        return;
    }

    // Convert angle to radians
    const angleRad = angle * Math.PI / 180;

    // Calculate work
    const work = force * distance * Math.cos(angleRad);

    // Display result
    showResult('work_result', {
        title: 'Work Done',
        value: `${work.toFixed(4)} J (Joules)`,
        details: [
            `Force: ${force} N`,
            `Distance: ${distance} m`,
            `Angle: ${angle}°`,
            `Formula used: W = F × d × cos(θ)`,
            `1 Joule = 1 N⋅m`
        ]
    });
}

// Power Calculator
function calculatePower() {
    const work = parseFloat(document.getElementById('power_work').value);
    const time = parseFloat(document.getElementById('power_time').value);

    if (isNaN(work) || isNaN(time) || time === 0) {
        showError('power_result', 'Please enter valid work and time');
        return;
    }

    // Calculate power
    const power = work / time;

    // Display result
    showResult('power_result', {
        title: 'Power',
        value: `${power.toFixed(4)} W (Watts)`,
        details: [
            `Work done: ${work} J`,
            `Time taken: ${time} s`,
            `Also equals: ${(power / 1000).toFixed(6)} kW (kilowatts)`,
            `Or: ${(power / 745.7).toFixed(6)} hp (horsepower)`,
            `Formula used: P = W/t`
        ]
    });
}

// Kinetic Energy Calculator
function calculateKineticEnergy() {
    const mass = parseFloat(document.getElementById('ke_mass').value);
    const velocity = parseFloat(document.getElementById('ke_velocity').value);

    if (isNaN(mass) || isNaN(velocity)) {
        showError('ke_result', 'Please enter valid mass and velocity');
        return;
    }

    // Calculate kinetic energy
    const kineticEnergy = 0.5 * mass * velocity * velocity;

    // Display result
    showResult('ke_result', {
        title: 'Kinetic Energy',
        value: `${kineticEnergy.toFixed(4)} J (Joules)`,
        details: [
            `Mass: ${mass} kg`,
            `Velocity: ${velocity} m/s`,
            `Also equals: ${(kineticEnergy / 1000).toFixed(6)} kJ`,
            `Formula used: KE = ½mv²`,
            `Energy of motion`
        ]
    });
}

// ========================================
// ELECTRICITY CALCULATORS
// ========================================

// Update Ohm's Law input fields based on what to calculate
function updateOhmsFields() {
    const calculate = document.getElementById('ohms_calculate').value;
    const inputsDiv = document.getElementById('ohms_inputs');

    let html = '';

    switch (calculate) {
        case 'voltage':
            html = `
                <div class="input-group">
                    <label for="ohms_current">Current (I)</label>
                    <input type="number" id="ohms_current" placeholder="Enter current (A)">
                </div>
                <div class="input-group">
                    <label for="ohms_resistance">Resistance (R)</label>
                    <input type="number" id="ohms_resistance" placeholder="Enter resistance (Ω)">
                </div>
            `;
            break;
        case 'current':
            html = `
                <div class="input-group">
                    <label for="ohms_voltage">Voltage (V)</label>
                    <input type="number" id="ohms_voltage" placeholder="Enter voltage (V)">
                </div>
                <div class="input-group">
                    <label for="ohms_resistance">Resistance (R)</label>
                    <input type="number" id="ohms_resistance" placeholder="Enter resistance (Ω)">
                </div>
            `;
            break;
        case 'resistance':
            html = `
                <div class="input-group">
                    <label for="ohms_voltage">Voltage (V)</label>
                    <input type="number" id="ohms_voltage" placeholder="Enter voltage (V)">
                </div>
                <div class="input-group">
                    <label for="ohms_current">Current (I)</label>
                    <input type="number" id="ohms_current" placeholder="Enter current (A)">
                </div>
            `;
            break;
    }

    inputsDiv.innerHTML = html;
}

// Ohm's Law Calculator
function calculateOhmsLaw() {
    const calculate = document.getElementById('ohms_calculate').value;

    let voltage, current, resistance, result;

    switch (calculate) {
        case 'voltage':
            current = parseFloat(document.getElementById('ohms_current').value);
            resistance = parseFloat(document.getElementById('ohms_resistance').value);

            if (isNaN(current) || isNaN(resistance)) {
                showError('ohms_result', 'Please enter valid values');
                return;
            }

            voltage = current * resistance;

            showResult('ohms_result', {
                title: 'Voltage (Ohm\'s Law)',
                value: `${voltage.toFixed(4)} V (Volts)`,
                details: [
                    `Current: ${current} A`,
                    `Resistance: ${resistance} Ω`,
                    `Formula used: V = I × R`,
                    `Calculation: ${current} A × ${resistance} Ω`
                ]
            });
            break;

        case 'current':
            voltage = parseFloat(document.getElementById('ohms_voltage').value);
            resistance = parseFloat(document.getElementById('ohms_resistance').value);

            if (isNaN(voltage) || isNaN(resistance) || resistance === 0) {
                showError('ohms_result', 'Please enter valid values (resistance cannot be 0)');
                return;
            }

            current = voltage / resistance;

            showResult('ohms_result', {
                title: 'Current (Ohm\'s Law)',
                value: `${current.toFixed(4)} A (Amperes)`,
                details: [
                    `Voltage: ${voltage} V`,
                    `Resistance: ${resistance} Ω`,
                    `Also equals: ${(current * 1000).toFixed(4)} mA`,
                    `Formula used: I = V / R`
                ]
            });
            break;

        case 'resistance':
            voltage = parseFloat(document.getElementById('ohms_voltage').value);
            current = parseFloat(document.getElementById('ohms_current').value);

            if (isNaN(voltage) || isNaN(current) || current === 0) {
                showError('ohms_result', 'Please enter valid values (current cannot be 0)');
                return;
            }

            resistance = voltage / current;

            showResult('ohms_result', {
                title: 'Resistance (Ohm\'s Law)',
                value: `${resistance.toFixed(4)} Ω (Ohms)`,
                details: [
                    `Voltage: ${voltage} V`,
                    `Current: ${current} A`,
                    `Also equals: ${(resistance / 1000).toFixed(6)} kΩ`,
                    `Formula used: R = V / I`
                ]
            });
            break;
    }
}

// Electric Power Calculator
function calculateElectricPower() {
    const voltage = parseFloat(document.getElementById('epower_voltage').value);
    const current = parseFloat(document.getElementById('epower_current').value);

    if (isNaN(voltage) || isNaN(current)) {
        showError('epower_result', 'Please enter valid voltage and current');
        return;
    }

    // Calculate power
    const power = voltage * current;
    const resistance = voltage / current;

    // Display result
    showResult('epower_result', {
        title: 'Electric Power',
        value: `${power.toFixed(4)} W (Watts)`,
        details: [
            `Voltage: ${voltage} V`,
            `Current: ${current} A`,
            `Resistance: ${resistance.toFixed(4)} Ω`,
            `Also equals: ${(power / 1000).toFixed(6)} kW`,
            `Formula used: P = V × I`
        ]
    });
}

// Resistors Calculator
function calculateResistors() {
    const config = document.getElementById('resistor_config').value;
    const valuesStr = document.getElementById('resistor_values').value;

    if (!valuesStr.trim()) {
        showError('resistor_result', 'Please enter resistor values');
        return;
    }

    // Parse resistor values
    const values = valuesStr.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

    if (values.length === 0) {
        showError('resistor_result', 'Please enter valid resistor values');
        return;
    }

    let totalResistance;

    if (config === 'series') {
        // Series: R_total = R1 + R2 + R3 + ...
        totalResistance = values.reduce((sum, r) => sum + r, 0);
    } else {
        // Parallel: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ...
        const reciprocalSum = values.reduce((sum, r) => sum + (1 / r), 0);
        totalResistance = 1 / reciprocalSum;
    }

    // Display result
    showResult('resistor_result', {
        title: `Total Resistance (${config.charAt(0).toUpperCase() + config.slice(1)})`,
        value: `${totalResistance.toFixed(4)} Ω`,
        details: [
            `Configuration: ${config}`,
            `Resistors: ${values.join(', ')} Ω`,
            `Number of resistors: ${values.length}`,
            config === 'series'
                ? `Formula: R_total = ${values.join(' + ')}`
                : `Formula: 1/R_total = ${values.map(v => `1/${v}`).join(' + ')}`
        ]
    });
}

// ========================================
// WAVES & OPTICS CALCULATORS
// ========================================

// Wave Speed Calculator
function calculateWaveSpeed() {
    const frequency = parseFloat(document.getElementById('wave_frequency').value);
    const wavelength = parseFloat(document.getElementById('wave_wavelength').value);

    if (isNaN(frequency) || isNaN(wavelength)) {
        showError('wave_result', 'Please enter valid frequency and wavelength');
        return;
    }

    // Calculate wave speed
    const speed = frequency * wavelength;

    // Display result
    showResult('wave_result', {
        title: 'Wave Speed',
        value: `${speed.toFixed(4)} m/s`,
        details: [
            `Frequency: ${frequency} Hz`,
            `Wavelength: ${wavelength} m`,
            `Also equals: ${(speed * 3.6).toFixed(4)} km/h`,
            `Formula used: v = f × λ`,
            speed === 299792458 ? 'Speed of light in vacuum!' : ''
        ].filter(Boolean)
    });
}

// Snell's Law Calculator
function calculateSnellsLaw() {
    const n1 = parseFloat(document.getElementById('snell_n1').value);
    const angle1 = parseFloat(document.getElementById('snell_angle1').value);
    const n2 = parseFloat(document.getElementById('snell_n2').value);

    if (isNaN(n1) || isNaN(angle1) || isNaN(n2)) {
        showError('snell_result', 'Please enter valid values');
        return;
    }

    // Convert angle to radians
    const angle1Rad = angle1 * Math.PI / 180;

    // Calculate refraction angle: n1 * sin(θ1) = n2 * sin(θ2)
    const sinAngle2 = (n1 * Math.sin(angle1Rad)) / n2;

    // Check for total internal reflection
    if (Math.abs(sinAngle2) > 1) {
        showResult('snell_result', {
            title: 'Total Internal Reflection',
            value: 'No refraction occurs',
            details: [
                `Critical angle exceeded`,
                `n₁ sin(θ₁) = ${(n1 * Math.sin(angle1Rad)).toFixed(4)}`,
                `This is greater than n₂ (${n2})`,
                `Light is completely reflected back`,
                `Critical angle: ${(Math.asin(n2 / n1) * 180 / Math.PI).toFixed(2)}°`
            ]
        });
        return;
    }

    const angle2Rad = Math.asin(sinAngle2);
    const angle2 = angle2Rad * 180 / Math.PI;

    // Display result
    showResult('snell_result', {
        title: 'Refraction Angle (Snell\'s Law)',
        value: `${angle2.toFixed(4)}°`,
        details: [
            `Incident angle: ${angle1}°`,
            `Refractive index 1: ${n1}`,
            `Refractive index 2: ${n2}`,
            `Formula used: n₁ sin(θ₁) = n₂ sin(θ₂)`,
            n1 > n2 ? 'Light bends away from normal' : 'Light bends toward normal'
        ]
    });
}

// Lens/Mirror Formula Calculator
function calculateLensFormula() {
    const f = parseFloat(document.getElementById('lens_focal').value);
    const u = parseFloat(document.getElementById('lens_object').value);

    if (isNaN(f) || isNaN(u) || u === 0) {
        showError('lens_result', 'Please enter valid focal length and object distance');
        return;
    }

    // Calculate image distance: 1/f = 1/v + 1/u
    // Rearranged: 1/v = 1/f - 1/u
    const v = (f * u) / (u - f);

    // Calculate magnification: m = v/u
    const magnification = -v / u;

    // Determine image characteristics
    let imageType = '';
    if (v > 0) {
        imageType = magnification > 1 ? 'Real, inverted, magnified' : 'Real, inverted, diminished';
    } else {
        imageType = 'Virtual, upright, magnified';
    }

    // Display result
    showResult('lens_result', {
        title: 'Lens/Mirror Formula',
        value: `Image distance: ${v.toFixed(4)} cm`,
        details: [
            `Focal length: ${f} cm`,
            `Object distance: ${u} cm`,
            `Magnification: ${magnification.toFixed(4)}×`,
            `Image type: ${imageType}`,
            `Formula used: 1/f = 1/u + 1/v`
        ]
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Unit conversions
function convertToMeters(value, unit) {
    const conversions = {
        'm': 1,
        'km': 1000,
        'mi': 1609.34,
        'ft': 0.3048
    };
    return value * conversions[unit];
}

function convertToSeconds(value, unit) {
    const conversions = {
        's': 1,
        'min': 60,
        'h': 3600
    };
    return value * conversions[unit];
}

// Show result
function showResult(elementId, data) {
    const resultDiv = document.getElementById(elementId);

    let detailsHTML = '';
    if (data.details && data.details.length > 0) {
        detailsHTML = `
            <div class="result-details">
                ${data.details.map(detail => `<p><strong>•</strong> ${detail}</p>`).join('')}
            </div>
        `;
    }

    resultDiv.innerHTML = `
        <div class="result-header">
            <i class="fas fa-check-circle"></i>
            <h3>${data.title}</h3>
        </div>
        <div class="result-value">${data.value}</div>
        ${detailsHTML}
    `;
    resultDiv.classList.add('show');
}

// Show error
function showError(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = `
        <div class="converter-error">
            <p><i class="fas fa-exclamation-triangle"></i> ${message}</p>
        </div>
    `;
    resultDiv.classList.remove('show');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Handle hash navigation
    if (window.location.hash) {
        const category = window.location.hash.substring(1);
        if (['kinematics', 'dynamics', 'electricity', 'waves'].includes(category)) {
            showPhysicsCategory(category);
        }
    }

    // Initialize Ohm's Law fields
    updateOhmsFields();
});