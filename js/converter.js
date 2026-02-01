// ========================================
// CONVERTER.JS - Unit Conversion Calculator
// ========================================

const ConverterApp = {
    units: {
        length: {
            meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000,
            mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701
        },
        weight: {
            kilogram: 1, gram: 1000, milligram: 1000000,
            pound: 2.20462, ounce: 35.274, ton: 0.001, 'metric ton': 0.001
        },
        temperature: { celsius: 'special', fahrenheit: 'special', kelvin: 'special' },
        area: {
            'square meter': 1, 'square kilometer': 0.000001, 'square centimeter': 10000,
            'square mile': 3.861e-7, 'square yard': 1.19599, 'square foot': 10.7639,
            'square inch': 1550, acre: 0.000247105, hectare: 0.0001
        },
        volume: {
            liter: 1, milliliter: 1000, 'cubic meter': 0.001, 'cubic centimeter': 1000,
            gallon: 0.264172, quart: 1.05669, pint: 2.11338, cup: 4.22675,
            'fluid ounce': 33.814
        },
        speed: {
            'meters/second': 1, 'kilometers/hour': 3.6, 'miles/hour': 2.23694,
            'feet/second': 3.28084, knot: 1.94384
        },
        time: {
            second: 1, minute: 0.0166667, hour: 0.000277778, day: 0.0000115741,
            week: 0.00000165344, month: 3.80517e-7, year: 3.17098e-8
        },
        data: {
            byte: 1, kilobyte: 0.001, megabyte: 0.000001, gigabyte: 1e-9, terabyte: 1e-12,
            bit: 8, kilobit: 0.008, megabit: 0.000008
        },
        energy: {
            joule: 1, kilojoule: 0.001, calorie: 0.239006, kilocalorie: 0.000239006,
            'watt-hour': 0.000277778, 'kilowatt-hour': 2.77778e-7
        },
        pressure: {
            pascal: 1, kilopascal: 0.001, bar: 0.00001, atmosphere: 0.00000986923,
            psi: 0.000145038, torr: 0.00750062
        }
    },

    init() {
        this.changeType();
        this.setupInputListeners();
    },

    setupInputListeners() {
        const fromInput = document.getElementById('conv-from-value');
        if (fromInput) {
            fromInput.addEventListener('input', () => this.convert());
            fromInput.addEventListener('keypress', (e) => {
                // Allow: numbers, decimal point, minus sign, e for scientific notation
                const char = String.fromCharCode(e.which);
                if (!/[\d.e\-]/.test(char)) {
                    e.preventDefault();
                }
            });
        }
    },

    changeType() {
        const type = document.getElementById('conv-type').value;
        const fromUnit = document.getElementById('conv-from-unit');
        const toUnit = document.getElementById('conv-to-unit');

        if (!fromUnit || !toUnit) return;

        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';

        Object.keys(this.units[type]).forEach(unit => {
            fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        });

        const fromValue = document.getElementById('conv-from-value');
        const toValue = document.getElementById('conv-to-value');
        if (fromValue) fromValue.value = '';
        if (toValue) toValue.value = '';
    },

    convert() {
        const type = document.getElementById('conv-type').value;
        const fromUnit = document.getElementById('conv-from-unit').value;
        const toUnit = document.getElementById('conv-to-unit').value;
        const fromValueInput = document.getElementById('conv-from-value');
        const toValueInput = document.getElementById('conv-to-value');

        if (!fromValueInput || !toValueInput) return;

        const fromValue = parseFloat(fromValueInput.value);

        if (isNaN(fromValue) || fromValueInput.value === '') {
            toValueInput.value = '';
            return;
        }

        let result;

        if (type === 'temperature') {
            result = this.convertTemperature(fromValue, fromUnit, toUnit);
        } else {
            const fromFactor = this.units[type][fromUnit];
            const toFactor = this.units[type][toUnit];
            result = fromValue / fromFactor * toFactor;
        }

        toValueInput.value = result.toFixed(8).replace(/\.?0+$/, '');
    },

    convertTemperature(value, from, to) {
        let celsius;

        if (from === 'celsius') celsius = value;
        else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
        else celsius = value - 273.15;

        if (to === 'celsius') return celsius;
        else if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
        else return celsius + 273.15;
    },

    swap() {
        const fromUnit = document.getElementById('conv-from-unit');
        const toUnit = document.getElementById('conv-to-unit');
        const fromValue = document.getElementById('conv-from-value');
        const toValue = document.getElementById('conv-to-value');

        if (!fromUnit || !toUnit || !fromValue || !toValue) return;

        [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
        [fromValue.value, toValue.value] = [toValue.value, fromValue.value];

        this.convert();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ConverterApp.init();
});