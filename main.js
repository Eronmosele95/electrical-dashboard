// Get DOM elements
const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const phaseSelect = document.getElementById('phase');
const efficiencyInput = document.getElementById('efficiency');
const resultsDiv = document.getElementById('results');

// Validation constants
const VALIDATION_RULES = {
    voltage: {
        min: 0,
        max: 1000000, // 1 MV reasonable limit
        required: true,
        description: 'Voltage'
    },
    current: {
        min: 0,
        max: 100000, // 100 kA reasonable limit
        required: true,
        description: 'Current'
    },
    efficiency: {
        min: 0,
        max: 100,
        required: false,
        description: 'Efficiency'
    }
};

// Validation function
function validateInputs(voltage, current, efficiency) {
    const errors = [];

    // Validate voltage
    if (isNaN(voltage) || voltage === '') {
        errors.push(`${VALIDATION_RULES.voltage.description} is required`);
    } else if (voltage <= VALIDATION_RULES.voltage.min) {
        errors.push(`${VALIDATION_RULES.voltage.description} must be greater than 0`);
    } else if (voltage > VALIDATION_RULES.voltage.max) {
        errors.push(`${VALIDATION_RULES.voltage.description} exceeds maximum limit of ${VALIDATION_RULES.voltage.max}V`);
    }

    // Validate current
    if (isNaN(current) || current === '') {
        errors.push(`${VALIDATION_RULES.current.description} is required`);
    } else if (current <= VALIDATION_RULES.current.min) {
        errors.push(`${VALIDATION_RULES.current.description} must be greater than 0`);
    } else if (current > VALIDATION_RULES.current.max) {
        errors.push(`${VALIDATION_RULES.current.description} exceeds maximum limit of ${VALIDATION_RULES.current.max}A`);
    }

    // Validate efficiency
    if (!isNaN(efficiency) && efficiency !== '') {
        if (efficiency < VALIDATION_RULES.efficiency.min) {
            errors.push(`${VALIDATION_RULES.efficiency.description} cannot be less than 0%`);
        } else if (efficiency > VALIDATION_RULES.efficiency.max) {
            errors.push(`${VALIDATION_RULES.efficiency.description} cannot exceed 100%`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Function to display validation errors
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

// Function to perform calculations and update results
function updateCalculations() {
    // Get input values
    const voltage = parseFloat(voltageInput.value);
    const current = parseFloat(currentInput.value);
    const phase = parseInt(phaseSelect.value);
    const efficiency = parseFloat(efficiencyInput.value) || 100;

    // Validate inputs
    const validation = validateInputs(voltage, current, efficiency);

    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }

    // Calculate values based on phase
    let kw, kva, pf;

    if (phase === 1) {
        // Single phase: P = V × I
        kw = (voltage * current) / 1000;
        kva = (voltage * current) / 1000;
    } else {
        // Three phase: P = √3 × V × I
        const sqrt3 = Math.sqrt(3);
        kw = (sqrt3 * voltage * current) / 1000;
        kva = (sqrt3 * voltage * current) / 1000;
    }

    // Apply efficiency
    const adjustedPower = kw * (efficiency / 100);

    // Assume power factor of 0.9 for display (can be enhanced if more data available)
    pf = 0.9;

    // Calculate reactive power (kVAR) from power triangle
    const kvar = Math.sqrt(Math.max(0, Math.pow(kva, 2) - Math.pow(kw, 2)));

    // Display results
    resultsDiv.innerHTML = `
        <div class="result-item" data-tooltip="Real power consumed by the load (actual work done)">
            <span class="result-label">Real Power (kW)</span>
            <span class="result-value">${kw.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Total power in the circuit (real + reactive components)">
            <span class="result-label">Apparent Power (kVA)</span>
            <span class="result-value">${kva.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Power wasted as heat in reactive components (inductors, capacitors)">
            <span class="result-label">Reactive Power (kVAR)</span>
            <span class="result-value">${kvar.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Ratio of real to apparent power (0-1). Higher is better. 1.0 = perfect">
            <span class="result-label">Power Factor</span>
            <span class="result-value">${pf.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Real power adjusted for system efficiency losses and gains">
            <span class="result-label">Adjusted Power (kW)</span>
            <span class="result-value">${adjustedPower.toFixed(2)}</span>
        </div>
        <div class="result-item" data-tooltip="Configuration type: Single phase for small loads, three phase for industrial">
            <span class="result-label">Phase Configuration</span>
            <span class="result-value">${phase === 1 ? 'Single (1Ø)' : 'Three (3Ø)'}</span>
        </div>
    `;
}

// Add event listeners for live calculations
voltageInput.addEventListener('input', updateCalculations);
currentInput.addEventListener('input', updateCalculations);
phaseSelect.addEventListener('change', updateCalculations);
efficiencyInput.addEventListener('input', updateCalculations);

// Initialize with welcome message
resultsDiv.innerHTML = `
    <div class="welcome-message">
        <p>Enter voltage and current values to calculate power consumption</p>
    </div>
`;
