// ========================================
// COMPUTERSCIENCE.JS - Computer Science Tools
// ========================================

const ComputerScienceApp = {
    init() {
        this.changeType();
    },

    changeType() {
        const type = document.getElementById('cs-type').value;
        const inputsContainer = document.getElementById('cs-inputs');

        if (!inputsContainer) return;

        inputsContainer.innerHTML = '';

        const inputConfigs = {
            'number-system': ['Number', 'From Base (2-36)', 'To Base (2-36)'],
            'binary-operations': ['First Binary Number', 'Second Binary Number', 'Operation (+, -, *, /)'],
            'boolean': ['Expression A (0 or 1)', 'Expression B (0 or 1)', 'Operation (AND, OR, XOR, NAND, NOR)'],
            'bitwise': ['First Number', 'Second Number', 'Operation (&, |, ^, <<, >>)'],
            'subnet': ['IP Address (e.g. 192.168.1.0)', 'Subnet Mask (e.g. /24)'],
            'color': ['Color Value (HEX or RGB)'],
            'ascii': ['Text or ASCII Code']
        };

        const inputs = inputConfigs[type] || [];
        inputs.forEach((input, i) => {
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="cs-input-${i}">${input}:</label>
                <input type="text" id="cs-input-${i}" placeholder="Enter value">
            `;
            inputsContainer.appendChild(div);
        });

        const resultContainer = document.getElementById('cs-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('cs-type').value;
        const resultContainer = document.getElementById('cs-result');
        if (!resultContainer) return;

        let result = '';

        try {
            switch (type) {
                case 'number-system':
                    const num = document.getElementById('cs-input-0').value;
                    const fromBase = parseInt(document.getElementById('cs-input-1').value);
                    const toBase = parseInt(document.getElementById('cs-input-2').value);
                    const decimal = parseInt(num, fromBase);
                    result = `Result: ${decimal.toString(toBase).toUpperCase()} (base ${toBase})`;
                    break;

                case 'binary-operations':
                    const bin1 = parseInt(document.getElementById('cs-input-0').value, 2);
                    const bin2 = parseInt(document.getElementById('cs-input-1').value, 2);
                    const op = document.getElementById('cs-input-2').value.trim();
                    let binResult;
                    switch (op) {
                        case '+': binResult = bin1 + bin2; break;
                        case '-': binResult = bin1 - bin2; break;
                        case '*': binResult = bin1 * bin2; break;
                        case '/': binResult = Math.floor(bin1 / bin2); break;
                    }
                    result = `Decimal: ${binResult}, Binary: ${binResult.toString(2)}`;
                    break;

                case 'boolean':
                    const a = parseInt(document.getElementById('cs-input-0').value);
                    const b = parseInt(document.getElementById('cs-input-1').value);
                    const boolOp = document.getElementById('cs-input-2').value.toUpperCase();
                    let boolResult;
                    switch (boolOp) {
                        case 'AND': boolResult = a & b; break;
                        case 'OR': boolResult = a | b; break;
                        case 'XOR': boolResult = a ^ b; break;
                        case 'NAND': boolResult = !(a & b) ? 1 : 0; break;
                        case 'NOR': boolResult = !(a | b) ? 1 : 0; break;
                    }
                    result = `Result: ${boolResult}`;
                    break;

                case 'bitwise':
                    const n1 = parseInt(document.getElementById('cs-input-0').value);
                    const n2 = parseInt(document.getElementById('cs-input-1').value);
                    const bitOp = document.getElementById('cs-input-2').value.trim();
                    let bitResult;
                    switch (bitOp) {
                        case '&': bitResult = n1 & n2; break;
                        case '|': bitResult = n1 | n2; break;
                        case '^': bitResult = n1 ^ n2; break;
                        case '<<': bitResult = n1 << n2; break;
                        case '>>': bitResult = n1 >> n2; break;
                    }
                    result = `Result: ${bitResult} (Binary: ${bitResult.toString(2)})`;
                    break;

                case 'subnet':
                    const ip = document.getElementById('cs-input-0').value;
                    const mask = parseInt(document.getElementById('cs-input-1').value.replace('/', ''));
                    const hosts = Math.pow(2, 32 - mask) - 2;
                    result = `Available Hosts: ${hosts}, Network: ${ip}/${mask}`;
                    break;

                case 'color':
                    const color = document.getElementById('cs-input-0').value.trim();
                    if (color.startsWith('#')) {
                        const r = parseInt(color.slice(1, 3), 16);
                        const g = parseInt(color.slice(3, 5), 16);
                        const b = parseInt(color.slice(5, 7), 16);
                        result = `RGB: rgb(${r}, ${g}, ${b})`;
                    } else if (color.startsWith('rgb')) {
                        const rgb = color.match(/\d+/g);
                        const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
                        result = `HEX: ${hex.toUpperCase()}`;
                    }
                    break;

                case 'ascii':
                    const input = document.getElementById('cs-input-0').value;
                    if (isNaN(input)) {
                        result = `ASCII Codes: ${Array.from(input).map(c => c.charCodeAt(0)).join(', ')}`;
                    } else {
                        result = `Character: ${String.fromCharCode(parseInt(input))}`;
                    }
                    break;
            }

            resultContainer.textContent = result || 'Invalid input';
            resultContainer.style.color = '#3b82f6';
        } catch (e) {
            resultContainer.textContent = 'Error in calculation';
            resultContainer.style.color = '#ef4444';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ComputerScienceApp.init();
});