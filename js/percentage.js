// Percentage Calculator JavaScript

console.log("JavaScript is connected!");

// Switch between different calculator types
function switchCalculator() {
    const calcType = document.getElementById('calcType').value;

    // Hide all calculators
    document.getElementById('whatIsCalc').style.display = 'none';
    document.getElementById('isWhatCalc').style.display = 'none';
    document.getElementById('percentOfCalc').style.display = 'none';
    document.getElementById('increaseCalc').style.display = 'none';
    document.getElementById('decreaseCalc').style.display = 'none';
    document.getElementById('changeCalc').style.display = 'none';

    // Hide result
    document.getElementById('result').classList.remove('show');

    // Show selected calculator
    switch (calcType) {
        case 'whatIs':
            document.getElementById('whatIsCalc').style.display = 'block';
            break;
        case 'isWhat':
            document.getElementById('isWhatCalc').style.display = 'block';
            break;
        case 'percentOf':
            document.getElementById('percentOfCalc').style.display = 'block';
            break;
        case 'increase':
            document.getElementById('increaseCalc').style.display = 'block';
            break;
        case 'decrease':
            document.getElementById('decreaseCalc').style.display = 'block';
            break;
        case 'change':
            document.getElementById('changeCalc').style.display = 'block';
            break;
    }
}

// Calculate: What is X% of Y?
function calculateWhatIs() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const number = parseFloat(document.getElementById('number1').value);

    if (isNaN(percent) || isNaN(number)) {
        alert('Please enter valid numbers');
        return;
    }

    const result = (percent / 100) * number;

    displayResult(
        result.toFixed(2),
        `<p><strong>Calculation:</strong> ${percent}% of ${number}</p>
         <p><strong>Formula:</strong> (${percent} ÷ 100) × ${number}</p>
         <p><strong>Result:</strong> ${result.toFixed(2)}</p>`
    );
}

// Calculate: X is what % of Y?
function calculateIsWhat() {
    const part = parseFloat(document.getElementById('part').value);
    const whole = parseFloat(document.getElementById('whole').value);

    if (isNaN(part) || isNaN(whole)) {
        alert('Please enter valid numbers');
        return;
    }

    if (whole === 0) {
        alert('Whole value cannot be zero');
        return;
    }

    const result = (part / whole) * 100;

    displayResult(
        result.toFixed(2) + '%',
        `<p><strong>Calculation:</strong> ${part} is what % of ${whole}?</p>
         <p><strong>Formula:</strong> (${part} ÷ ${whole}) × 100</p>
         <p><strong>Result:</strong> ${result.toFixed(2)}%</p>`
    );
}

// Calculate: X is Y% of what?
function calculatePercentOf() {
    const part = parseFloat(document.getElementById('partValue').value);
    const percent = parseFloat(document.getElementById('percentValue').value);

    if (isNaN(part) || isNaN(percent)) {
        alert('Please enter valid numbers');
        return;
    }

    if (percent === 0) {
        alert('Percentage cannot be zero');
        return;
    }

    const result = (part * 100) / percent;

    displayResult(
        result.toFixed(2),
        `<p><strong>Calculation:</strong> ${part} is ${percent}% of what?</p>
         <p><strong>Formula:</strong> (${part} × 100) ÷ ${percent}</p>
         <p><strong>Result:</strong> ${result.toFixed(2)}</p>`
    );
}

// Calculate Percentage Increase
function calculateIncrease() {
    const original = parseFloat(document.getElementById('originalInc').value);
    const percent = parseFloat(document.getElementById('percentInc').value);

    if (isNaN(original) || isNaN(percent)) {
        alert('Please enter valid numbers');
        return;
    }

    const increase = (original * percent) / 100;
    const result = original + increase;

    displayResult(
        result.toFixed(2),
        `<p><strong>Original Value:</strong> ${original}</p>
         <p><strong>Percentage Increase:</strong> ${percent}%</p>
         <p><strong>Increase Amount:</strong> ${increase.toFixed(2)}</p>
         <p><strong>Final Value:</strong> ${result.toFixed(2)}</p>
         <p><strong>Formula:</strong> ${original} + (${original} × ${percent}% / 100)</p>`
    );
}

// Calculate Percentage Decrease
function calculateDecrease() {
    const original = parseFloat(document.getElementById('originalDec').value);
    const percent = parseFloat(document.getElementById('percentDec').value);

    if (isNaN(original) || isNaN(percent)) {
        alert('Please enter valid numbers');
        return;
    }

    const decrease = (original * percent) / 100;
    const result = original - decrease;

    displayResult(
        result.toFixed(2),
        `<p><strong>Original Value:</strong> ${original}</p>
         <p><strong>Percentage Decrease:</strong> ${percent}%</p>
         <p><strong>Decrease Amount:</strong> ${decrease.toFixed(2)}</p>
         <p><strong>Final Value:</strong> ${result.toFixed(2)}</p>
         <p><strong>Formula:</strong> ${original} - (${original} × ${percent}% / 100)</p>`
    );
}

// Calculate Percentage Change
function calculateChange() {
    const oldValue = parseFloat(document.getElementById('oldValue').value);
    const newValue = parseFloat(document.getElementById('newValue').value);

    if (isNaN(oldValue) || isNaN(newValue)) {
        alert('Please enter valid numbers');
        return;
    }

    if (oldValue === 0) {
        alert('Old value cannot be zero');
        return;
    }

    const change = ((newValue - oldValue) / oldValue) * 100;
    const changeType = change >= 0 ? 'Increase' : 'Decrease';
    const absoluteChange = Math.abs(newValue - oldValue);

    displayResult(
        change.toFixed(2) + '%',
        `<p><strong>Old Value:</strong> ${oldValue}</p>
         <p><strong>New Value:</strong> ${newValue}</p>
         <p><strong>Change Type:</strong> ${changeType}</p>
         <p><strong>Absolute Change:</strong> ${absoluteChange.toFixed(2)}</p>
         <p><strong>Percentage Change:</strong> ${change.toFixed(2)}%</p>
         <p><strong>Formula:</strong> ((${newValue} - ${oldValue}) / ${oldValue}) × 100</p>`
    );
}

// Display result
function displayResult(value, details) {
    document.getElementById('resultValue').textContent = value;
    document.getElementById('resultDetails').innerHTML = details;
    document.getElementById('result').classList.add('show');

    // Scroll to result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy result to clipboard
function copyResult() {
    const resultText = document.getElementById('resultValue').textContent;

    navigator.clipboard.writeText(resultText).then(function () {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(function () {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(function (err) {
        alert('Failed to copy: ' + err);
    });
}

// Reset form
function resetForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });

    document.getElementById('result').classList.remove('show');
}

// Allow Enter key to trigger calculation
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const calcType = document.getElementById('calcType').value;

        switch (calcType) {
            case 'whatIs':
                if (document.getElementById('whatIsCalc').style.display !== 'none') {
                    calculateWhatIs();
                }
                break;
            case 'isWhat':
                if (document.getElementById('isWhatCalc').style.display !== 'none') {
                    calculateIsWhat();
                }
                break;
            case 'percentOf':
                if (document.getElementById('percentOfCalc').style.display !== 'none') {
                    calculatePercentOf();
                }
                break;
            case 'increase':
                if (document.getElementById('increaseCalc').style.display !== 'none') {
                    calculateIncrease();
                }
                break;
            case 'decrease':
                if (document.getElementById('decreaseCalc').style.display !== 'none') {
                    calculateDecrease();
                }
                break;
            case 'change':
                if (document.getElementById('changeCalc').style.display !== 'none') {
                    calculateChange();
                }
                break;
        }
    }
});