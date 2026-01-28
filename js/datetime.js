// ========================================
// DATETIME.JS - Date & Time Calculators
// ========================================

const DateTimeApp = {
    init() {
        this.changeType();
    },

    changeType() {
        const type = document.getElementById('datetime-type').value;
        const inputsContainer = document.getElementById('datetime-inputs');

        if (!inputsContainer) return;

        inputsContainer.innerHTML = '';

        const inputConfigs = {
            'age': ['Birth Date|date'],
            'date-diff': ['Start Date|date', 'End Date|date'],
            'date-add': ['Start Date|date', 'Days to Add/Subtract|text'],
            'business-days': ['Start Date|date', 'End Date|date'],
            'time-diff': ['Start Time (HH:MM)|time', 'End Time (HH:MM)|time'],
            'timezone': ['Time (HH:MM)|time', 'From Timezone Offset|text', 'To Timezone Offset|text'],
            'unix': ['Unix Timestamp or Date|text'],
            'week-number': ['Date|date']
        };

        const inputs = inputConfigs[type] || [];
        inputs.forEach((input, i) => {
            const [label, inputType] = input.split('|');
            const div = document.createElement('div');
            div.className = 'input-row';
            div.innerHTML = `
                <label for="datetime-input-${i}">${label}:</label>
                <input type="${inputType}" id="datetime-input-${i}">
            `;
            inputsContainer.appendChild(div);
        });

        const resultContainer = document.getElementById('datetime-result');
        if (resultContainer) resultContainer.textContent = '';
    },

    calculate() {
        const type = document.getElementById('datetime-type').value;
        const resultContainer = document.getElementById('datetime-result');
        if (!resultContainer) return;

        let result = '';

        try {
            switch (type) {
                case 'age':
                    const birthDate = new Date(document.getElementById('datetime-input-0').value);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    const ageMonths = monthDiff < 0 ? 12 + monthDiff : monthDiff;
                    const ageDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
                    result = `Age: ${age} years, ${ageMonths} months (${ageDays} total days)`;
                    break;

                case 'date-diff':
                    const start = new Date(document.getElementById('datetime-input-0').value);
                    const end = new Date(document.getElementById('datetime-input-1').value);
                    const diffTime = Math.abs(end - start);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const diffYears = Math.floor(diffDays / 365);
                    const remDays = diffDays % 365;
                    const diffMonths = Math.floor(remDays / 30);
                    const diffDaysRem = remDays % 30;
                    result = `Difference: ${diffYears} years, ${diffMonths} months, ${diffDaysRem} days (${diffDays} total days)`;
                    break;

                case 'date-add':
                    const baseDate = new Date(document.getElementById('datetime-input-0').value);
                    const daysToAdd = parseInt(document.getElementById('datetime-input-1').value);
                    const newDate = new Date(baseDate);
                    newDate.setDate(newDate.getDate() + daysToAdd);
                    result = `New Date: ${newDate.toDateString()}`;
                    break;

                case 'business-days':
                    const startDate = new Date(document.getElementById('datetime-input-0').value);
                    const endDate = new Date(document.getElementById('datetime-input-1').value);
                    let businessDays = 0;
                    const currentDate = new Date(startDate);

                    while (currentDate <= endDate) {
                        const dayOfWeek = currentDate.getDay();
                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            businessDays++;
                        }
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                    result = `Business Days: ${businessDays}`;
                    break;

                case 'time-diff':
                    const startTime = document.getElementById('datetime-input-0').value;
                    const endTime = document.getElementById('datetime-input-1').value;
                    const [sh, sm] = startTime.split(':').map(Number);
                    const [eh, em] = endTime.split(':').map(Number);
                    const startMinutes = sh * 60 + sm;
                    const endMinutes = eh * 60 + em;
                    const diffMinutes = Math.abs(endMinutes - startMinutes);
                    const hours = Math.floor(diffMinutes / 60);
                    const minutes = diffMinutes % 60;
                    result = `Time Difference: ${hours} hours, ${minutes} minutes`;
                    break;

                case 'timezone':
                    const time = document.getElementById('datetime-input-0').value;
                    const fromTZ = parseFloat(document.getElementById('datetime-input-1').value);
                    const toTZ = parseFloat(document.getElementById('datetime-input-2').value);
                    const [h, m] = time.split(':').map(Number);
                    const totalMinutes = h * 60 + m + (toTZ - fromTZ) * 60;
                    const newH = Math.floor(totalMinutes / 60) % 24;
                    const newM = totalMinutes % 60;
                    result = `Converted Time: ${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                    break;

                case 'unix':
                    const unixInput = document.getElementById('datetime-input-0').value;
                    if (isNaN(unixInput)) {
                        const timestamp = new Date(unixInput).getTime() / 1000;
                        result = `Unix Timestamp: ${timestamp}`;
                    } else {
                        const date = new Date(parseInt(unixInput) * 1000);
                        result = `Date: ${date.toString()}`;
                    }
                    break;

                case 'week-number':
                    const weekDate = new Date(document.getElementById('datetime-input-0').value);
                    const firstDay = new Date(weekDate.getFullYear(), 0, 1);
                    const pastDays = (weekDate - firstDay) / (1000 * 60 * 60 * 24);
                    const weekNum = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
                    result = `Week Number: ${weekNum} of ${weekDate.getFullYear()}`;
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
    DateTimeApp.init();
});