"use strict";
const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const phaseSelect = document.getElementById('phase');
const powerFactorInput = document.getElementById('powerFactor');
const efficiencyInput = document.getElementById('efficiency');
const electricityRateInput = document.getElementById('electricityRate');
const resultsDiv = document.getElementById('results');
const themeToggle = document.getElementById('themeToggle');
const saveButton = document.getElementById('saveCalculation');
const clearHistoryButton = document.getElementById('clearHistory');
const historyList = document.getElementById('historyList');
const VALIDATION_RULES = {
    voltage: {
        min: 0,
        max: 1000000,
        required: true,
        description: 'Voltage'
    },
    current: {
        min: 0,
        max: 100000,
        required: true,
        description: 'Current'
    },
    powerFactor: {
        min: 0.5,
        max: 1.0,
        required: false,
        description: 'Power Factor'
    },
    efficiency: {
        min: 0,
        max: 100,
        required: false,
        description: 'Efficiency'
    },
    rate: {
        min: 0,
        max: 10,
        required: false,
        description: 'Electricity Rate'
    }
};
function validateInputs(voltage, current, powerFactor, efficiency) {
    const errors = [];
    if (isNaN(voltage) || voltage === null) {
        errors.push(`${VALIDATION_RULES.voltage.description} is required`);
    }
    else if (voltage <= VALIDATION_RULES.voltage.min) {
        errors.push(`${VALIDATION_RULES.voltage.description} must be greater than 0`);
    }
    else if (voltage > VALIDATION_RULES.voltage.max) {
        errors.push(`${VALIDATION_RULES.voltage.description} exceeds maximum limit`);
    }
    if (isNaN(current) || current === null) {
        errors.push(`${VALIDATION_RULES.current.description} is required`);
    }
    else if (current <= VALIDATION_RULES.current.min) {
        errors.push(`${VALIDATION_RULES.current.description} must be greater than 0`);
    }
    else if (current > VALIDATION_RULES.current.max) {
        errors.push(`${VALIDATION_RULES.current.description} exceeds maximum limit`);
    }
    if (!isNaN(powerFactor) && powerFactor !== null) {
        if (powerFactor < VALIDATION_RULES.powerFactor.min || powerFactor > VALIDATION_RULES.powerFactor.max) {
            errors.push(`${VALIDATION_RULES.powerFactor.description} must be between 0.5 and 1.0`);
        }
    }
    if (!isNaN(efficiency) && efficiency !== null) {
        if (efficiency < VALIDATION_RULES.efficiency.min || efficiency > VALIDATION_RULES.efficiency.max) {
            errors.push(`${VALIDATION_RULES.efficiency.description} must be between 0 and 100`);
        }
    }
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
function displayErrors(errors) {
    const errorHTML = errors.map(error => `<li>${error}</li>`).join('');
    resultsDiv.innerHTML = `
        <div class="error-container">
            <h3 class="error-title">⚠️ Validation Errors</h3>
            <ul class="error-list">
                ${errorHTML}
            </ul>
        </div>
    `;
}
function calculatePower(voltage, current, phase, powerFactor, efficiency, rate) {
    let kw;
    let kva;
    if (phase === 1) {
        kva = (voltage * current) / 1000;
        kw = kva * powerFactor;
    }
    else {
        const sqrt3 = Math.sqrt(3);
        kva = (sqrt3 * voltage * current) / 1000;
        kw = kva * powerFactor;
    }
    const adjustedPower = kw * (efficiency / 100);
    const kvar = Math.sqrt(Math.max(0, Math.pow(kva, 2) - Math.pow(kw, 2)));
    const costPerHour = adjustedPower * rate;
    const costPerDay = costPerHour * 24;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;
    return {
        kw,
        kva,
        kvar,
        pf: powerFactor,
        adjustedPower,
        phase,
        costPerHour,
        costPerDay,
        costPerMonth,
        costPerYear
    };
}
function displayResults(result) {
    resultsDiv.innerHTML = `
        <div class="result-item" data-tooltip="Real power consumed by the load (actual work done)">
            <span class="result-label">Real Power (kW)</span>
            <span class="result-value">${result.kw.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Total power in the circuit (real + reactive components)">
            <span class="result-label">Apparent Power (kVA)</span>
            <span class="result-value">${result.kva.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Power wasted in reactive components (inductors, capacitors)">
            <span class="result-label">Reactive Power (kVAR)</span>
            <span class="result-value">${result.kvar.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Ratio of real to apparent power (0-1). Higher is better. 1.0 = perfect">
            <span class="result-label">Power Factor</span>
            <span class="result-value">${result.pf.toFixed(3)}</span>
        </div>
        <div class="result-item" data-tooltip="Real power adjusted for system efficiency losses">
            <span class="result-label">Adjusted Power (kW)</span>
            <span class="result-value">${result.adjustedPower.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Configuration type: Single phase for small loads, three phase for industrial">
            <span class="result-label">Phase Configuration</span>
            <span class="result-value">${result.phase === 1 ? 'Single (1Ø)' : 'Three (3Ø)'}</span>
        </div>
        <div class="result-item cost-item" data-tooltip="Electricity cost per hour of operation">
            <span class="result-label">Cost / Hour</span>
            <span class="result-value cost-value">$${result.costPerHour.toFixed(3)}</span>
        </div>
        <div class="result-item cost-item" data-tooltip="Electricity cost per day (24 hours)">
            <span class="result-label">Cost / Day</span>
            <span class="result-value cost-value">$${result.costPerDay.toFixed(2)}</span>
        </div>
        <div class="result-item cost-item" data-tooltip="Electricity cost per month (30 days)">
            <span class="result-label">Cost / Month</span>
            <span class="result-value cost-value">$${result.costPerMonth.toFixed(2)}</span>
        </div>
        <div class="result-item cost-item" data-tooltip="Electricity cost per year (365 days)">
            <span class="result-label">Cost / Year</span>
            <span class="result-value cost-value">$${result.costPerYear.toFixed(2)}</span>
        </div>
    `;
}
function getInputValues() {
    return {
        voltage: parseFloat(voltageInput.value),
        current: parseFloat(currentInput.value),
        phase: parseInt(phaseSelect.value),
        powerFactor: parseFloat(powerFactorInput.value) || 0.9,
        efficiency: parseFloat(efficiencyInput.value) || 100,
        rate: parseFloat(electricityRateInput.value) || 0.12
    };
}
function updateCalculations() {
    const { voltage, current, phase, powerFactor, efficiency, rate } = getInputValues();
    const validation = validateInputs(voltage, current, powerFactor, efficiency);
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }
    const result = calculatePower(voltage, current, phase, powerFactor, efficiency, rate);
    displayResults(result);
}
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}
function saveCalculation() {
    const { voltage, current, phase, powerFactor, efficiency, rate } = getInputValues();
    const validation = validateInputs(voltage, current, powerFactor, efficiency);
    if (!validation.isValid) {
        alert('Please fix validation errors before saving');
        return;
    }
    const result = calculatePower(voltage, current, phase, powerFactor, efficiency, rate);
    const historyItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        voltage,
        current,
        phase,
        powerFactor,
        efficiency,
        rate,
        result
    };
    const history = getHistory();
    history.unshift(historyItem);
    if (history.length > 10) {
        history.splice(10);
    }
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    displayHistory();
}
function getHistory() {
    const historyData = localStorage.getItem('calculationHistory');
    return historyData ? JSON.parse(historyData) : [];
}
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('calculationHistory');
        displayHistory();
    }
}
function deleteHistoryItem(id) {
    const history = getHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem('calculationHistory', JSON.stringify(filtered));
    displayHistory();
}
function loadHistoryItem(id) {
    const history = getHistory();
    const item = history.find(h => h.id === id);
    if (item) {
        voltageInput.value = item.voltage.toString();
        currentInput.value = item.current.toString();
        phaseSelect.value = item.phase.toString();
        powerFactorInput.value = item.powerFactor.toString();
        efficiencyInput.value = item.efficiency.toString();
        electricityRateInput.value = item.rate.toString();
        updateCalculations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
function displayHistory() {
    const history = getHistory();
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">No saved calculations yet</p>';
        return;
    }
    historyList.innerHTML = history.map(item => {
        const date = new Date(item.timestamp);
        return `
            <div class="history-item">
                <div class="history-header-info">
                    <span class="history-date">${date.toLocaleString()}</span>
                    <div class="history-actions">
                        <button class="btn-load" onclick="window.loadHistoryItem('${item.id}')" title="Load this calculation">
                            📂 Load
                        </button>
                        <button class="btn-delete" onclick="window.deleteHistoryItem('${item.id}')" title="Delete">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="history-details">
                    <span>${item.voltage}V, ${item.current}A, ${item.phase}Ø, PF: ${item.powerFactor}</span>
                    <span class="history-result">→ ${item.result.adjustedPower.toFixed(2)} kW</span>
                    <span class="history-cost">$${item.result.costPerMonth.toFixed(2)}/mo</span>
                </div>
            </div>
        `;
    }).join('');
}
function initializeApp() {
    voltageInput.addEventListener('input', updateCalculations);
    currentInput.addEventListener('input', updateCalculations);
    phaseSelect.addEventListener('change', updateCalculations);
    powerFactorInput.addEventListener('input', updateCalculations);
    efficiencyInput.addEventListener('input', updateCalculations);
    electricityRateInput.addEventListener('input', updateCalculations);
    themeToggle.addEventListener('click', toggleTheme);
    saveButton.addEventListener('click', saveCalculation);
    clearHistoryButton.addEventListener('click', clearHistory);
    initTheme();
    displayHistory();
    window.loadHistoryItem = loadHistoryItem;
    window.deleteHistoryItem = deleteHistoryItem;
    resultsDiv.innerHTML = `
        <div class="welcome-message">
            <p>Enter voltage and current values to calculate power consumption and costs</p>
        </div>
    `;
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else {
    initializeApp();
}
//# sourceMappingURL=main.js.map