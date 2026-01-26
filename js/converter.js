// ========================================
// Unit Converter JavaScript
// ========================================

// Conversion factors to base units

console.log("JavaScript is connected!");

const conversions = {
    // Length (base: meters)
    length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701,
        nauticalMiles: 0.000539957
    },

    // Weight/Mass (base: kilograms)
    weight: {
        kilograms: 1,
        grams: 1000,
        milligrams: 1000000,
        metricTons: 0.001,
        pounds: 2.20462,
        ounces: 35.274,
        tons: 0.00110231,
        stone: 0.157473
    },

    // Area (base: square meters)
    area: {
        sqMeters: 1,
        sqKilometers: 0.000001,
        sqCentimeters: 10000,
        sqMiles: 3.861e-7,
        sqYards: 1.19599,
        sqFeet: 10.7639,
        sqInches: 1550,
        hectares: 0.0001,
        acres: 0.000247105
    },

    // Volume (base: liters)
    volume: {
        liters: 1,
        milliliters: 1000,
        cubicMeters: 0.001,
        cubicCentimeters: 1000,
        gallons: 0.264172,
        quarts: 1.05669,
        pints: 2.11338,
        cups: 4.22675,
        fluidOunces: 33.814,
        tablespoons: 67.628,
        teaspoons: 202.884
    },

    // Speed (base: meters per second)
    speed: {
        mps: 1,
        kph: 3.6,
        mph: 2.23694,
        fps: 3.28084,
        knots: 1.94384,
        mach: 0.00291545
    }
};

// Show specific converter
function showConverter(type) {
    // Hide all converters
    document.querySelectorAll('.converter-container').forEach(container => {
        container.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.converter-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected converter
    document.getElementById(type).classList.add('active');

    // Add active class to clicked tab
    document.querySelector(`[data-converter="${type}"]`).classList.add('active');

    // Trigger conversion for the selected type
    switch (type) {
        case 'length':
            convertLength();
            break;
        case 'weight':
            convertWeight();
            break;
        case 'temperature':
            convertTemperature();
            break;
        case 'area':
            convertArea();
            break;
        case 'volume':
            convertVolume();
            break;
        case 'speed':
            convertSpeed();
            break;
    }
}

// Generic conversion function
function convert(value, fromUnit, toUnit, conversionTable) {
    if (isNaN(value) || value === '') return '';

    // Convert to base unit first, then to target unit
    const baseValue = parseFloat(value) / conversionTable[fromUnit];
    const result = baseValue * conversionTable[toUnit];

    return result.toFixed(8).replace(/\.?0+$/, '');
}

// Length Converter
function convertLength() {
    const value = document.getElementById('lengthValue').value;
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;

    const result = convert(value, from, to, conversions.length);
    document.getElementById('lengthResult').value = result;

    // Update formula display
    if (value && result) {
        document.getElementById('lengthFormula').textContent =
            `${value} ${getUnitName(from, 'length')} = ${result} ${getUnitName(to, 'length')}`;
    }
}

// Weight Converter
function convertWeight() {
    const value = document.getElementById('weightValue').value;
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;

    const result = convert(value, from, to, conversions.weight);
    document.getElementById('weightResult').value = result;

    // Update formula display
    if (value && result) {
        document.getElementById('weightFormula').textContent =
            `${value} ${getUnitName(from, 'weight')} = ${result} ${getUnitName(to, 'weight')}`;
    }
}

// Temperature Converter
function convertTemperature() {
    const value = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;

    if (isNaN(value) || value === '') {
        document.getElementById('tempResult').value = '';
        return;
    }

    let celsius;

    // Convert to Celsius first
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5 / 9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to target
    let result;
    switch (to) {
        case 'celsius':
            result = celsius;
            break;
        case 'fahrenheit':
            result = (celsius * 9 / 5) + 32;
            break;
        case 'kelvin':
            result = celsius + 273.15;
            break;
    }

    document.getElementById('tempResult').value = result.toFixed(4).replace(/\.?0+$/, '');

    // Update formula display
    if (value && result) {
        document.getElementById('tempFormula').textContent =
            `${value}°${from.charAt(0).toUpperCase()} = ${result.toFixed(2)}°${to.charAt(0).toUpperCase()}`;
    }
}

// Area Converter
function convertArea() {
    const value = document.getElementById('areaValue').value;
    const from = document.getElementById('areaFrom').value;
    const to = document.getElementById('areaTo').value;

    const result = convert(value, from, to, conversions.area);
    document.getElementById('areaResult').value = result;

    // Update formula display
    if (value && result) {
        document.getElementById('areaFormula').textContent =
            `${value} ${getUnitName(from, 'area')} = ${result} ${getUnitName(to, 'area')}`;
    }
}

// Volume Converter
function convertVolume() {
    const value = document.getElementById('volumeValue').value;
    const from = document.getElementById('volumeFrom').value;
    const to = document.getElementById('volumeTo').value;

    const result = convert(value, from, to, conversions.volume);
    document.getElementById('volumeResult').value = result;

    // Update formula display
    if (value && result) {
        document.getElementById('volumeFormula').textContent =
            `${value} ${getUnitName(from, 'volume')} = ${result} ${getUnitName(to, 'volume')}`;
    }
}

// Speed Converter
function convertSpeed() {
    const value = document.getElementById('speedValue').value;
    const from = document.getElementById('speedFrom').value;
    const to = document.getElementById('speedTo').value;

    const result = convert(value, from, to, conversions.speed);
    document.getElementById('speedResult').value = result;

    // Update formula display
    if (value && result) {
        document.getElementById('speedFormula').textContent =
            `${value} ${getUnitName(from, 'speed')} = ${result} ${getUnitName(to, 'speed')}`;
    }
}

// Swap units
function swapUnits(type) {
    const fromSelect = document.getElementById(`${type}From`);
    const toSelect = document.getElementById(`${type}To`);

    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    // Trigger conversion
    switch (type) {
        case 'length':
            convertLength();
            break;
        case 'weight':
            convertWeight();
            break;
        case 'temperature':
            convertTemperature();
            break;
        case 'area':
            convertArea();
            break;
        case 'volume':
            convertVolume();
            break;
        case 'speed':
            convertSpeed();
            break;
    }
}

// Get unit name from select option
function getUnitName(value, type) {
    const select = document.querySelector(`#${type}From option[value="${value}"], #${type}To option[value="${value}"]`);
    return select ? select.textContent.match(/\(([^)]+)\)/)?.[1] || select.textContent : value;
}

// Initialize converters on page load
document.addEventListener('DOMContentLoaded', function () {
    // Convert initial values
    convertLength();
    convertWeight();
    convertTemperature();
    convertArea();
    convertVolume();
    convertSpeed();

    // Handle hash navigation
    if (window.location.hash) {
        const type = window.location.hash.substring(1);
        if (['length', 'weight', 'temperature', 'area', 'volume', 'speed'].includes(type)) {
            showConverter(type);
        }
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + Enter to swap units in active converter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeConverter = document.querySelector('.converter-container.active');
        if (activeConverter) {
            const type = activeConverter.id;
            swapUnits(type);
        }
    }
});