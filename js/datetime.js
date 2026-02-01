// ========================================
// DATETIME.JS - Date & Time Calculators
// ========================================

const DateTimeApp = {
    init() {
        this.changeType();
    },

    // Helper function to calculate comprehensive time breakdown
    getTimeBreakdown(startDate, endDate) {
        const diffMs = Math.abs(endDate - startDate);
        
        // Calculate all time units
        const totalSeconds = Math.floor(diffMs / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = Math.floor(totalDays / 30.44); // Average month length
        const totalYears = Math.floor(totalDays / 365.25); // Account for leap years
        const totalDecades = Math.floor(totalYears / 10);
        
        // Calculate exact breakdown
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();
        
        // Adjust for negative values
        if (days < 0) {
            months--;
            const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate remaining time units
        const remainingDays = totalDays % 7;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        
        return {
            // Exact breakdown
            exact: {
                years: years,
                months: months,
                days: days
            },
            // Total counts
            totals: {
                decades: totalDecades,
                years: totalYears,
                months: totalMonths,
                weeks: totalWeeks,
                days: totalDays,
                hours: totalHours,
                minutes: totalMinutes,
                seconds: totalSeconds
            },
            // Remaining units
            remaining: {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
        };
    },

    formatTimeBreakdown(breakdown) {
        const { exact, totals, remaining } = breakdown;
        
        let html = '<div class="time-breakdown">';
        
        // Primary result
        html += `<div class="breakdown-primary">
            <h3>Exact Age/Duration:</h3>
            <p class="large-result">${exact.years} years, ${exact.months} months, ${exact.days} days</p>
        </div>`;
        
        // Detailed breakdown
        html += `<div class="breakdown-detailed">
            <h4>Complete Breakdown:</h4>
            <div class="breakdown-grid">`;
        
        if (totals.decades > 0) {
            html += `<div class="breakdown-item">
                <span class="breakdown-label">Decades:</span>
                <span class="breakdown-value">${totals.decades.toLocaleString()}</span>
            </div>`;
        }
        
        html += `
            <div class="breakdown-item">
                <span class="breakdown-label">Years:</span>
                <span class="breakdown-value">${totals.years.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Months:</span>
                <span class="breakdown-value">${totals.months.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Weeks:</span>
                <span class="breakdown-value">${totals.weeks.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Days:</span>
                <span class="breakdown-value">${totals.days.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Hours:</span>
                <span class="breakdown-value">${totals.hours.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Minutes:</span>
                <span class="breakdown-value">${totals.minutes.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Seconds:</span>
                <span class="breakdown-value">${totals.seconds.toLocaleString()}</span>
            </div>
        `;
        
        html += `</div></div></div>`;
        
        return html;
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
                    const breakdown = this.getTimeBreakdown(birthDate, today);
                    resultContainer.innerHTML = this.formatTimeBreakdown(breakdown);
                    resultContainer.style.color = '#3b82f6';
                    return;

                case 'date-diff':
                    const start = new Date(document.getElementById('datetime-input-0').value);
                    const end = new Date(document.getElementById('datetime-input-1').value);
                    const diffBreakdown = this.getTimeBreakdown(start, end);
                    resultContainer.innerHTML = this.formatTimeBreakdown(diffBreakdown);
                    resultContainer.style.color = '#3b82f6';
                    return;

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