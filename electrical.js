/**
 * Electrical Load Dashboard - Utility functions
 * Provides helper functions for electrical calculations and data processing
 */
/**
 * Calculate power consumption (P = V × I)
 * @param voltage - Voltage in volts
 * @param current - Current in amperes
 * @returns Power in watts
 */
export function calculatePower(voltage, current) {
    return voltage * current;
}
/**
 * Calculate apparent power (S = V × I)
 * @param voltage - Voltage in volts
 * @param current - Current in amperes
 * @returns Apparent power in volt-amperes (VA)
 */
export function calculateApparentPower(voltage, current) {
    return voltage * current;
}
/**
 * Calculate power factor
 * @param realPower - Real power in watts
 * @param apparentPower - Apparent power in volt-amperes
 * @returns Power factor (0-1)
 */
export function calculatePowerFactor(realPower, apparentPower) {
    if (apparentPower === 0)
        return 0;
    return realPower / apparentPower;
}
/**
 * Convert watts to kilowatts
 * @param watts - Power in watts
 * @returns Power in kilowatts
 */
export function wattsToKilowatts(watts) {
    return watts / 1000;
}
/**
 * Convert kilowatts to watts
 * @param kilowatts - Power in kilowatts
 * @returns Power in watts
 */
export function kilowattsToWatts(kilowatts) {
    return kilowatts * 1000;
}
/**
 * Calculate reactive power using power triangle
 * Q = √(S² - P²)
 * @param apparentPower - Apparent power (S) in VA
 * @param realPower - Real power (P) in W
 * @returns Reactive power (Q) in VAR
 */
export function calculateReactivePower(apparentPower, realPower) {
    return Math.sqrt(Math.max(0, Math.pow(apparentPower, 2) - Math.pow(realPower, 2)));
}
/**
 * Calculate three-phase power
 * P = √3 × V × I × PF
 * @param voltage - Line voltage in volts
 * @param current - Current in amperes
 * @param powerFactor - Power factor (0-1)
 * @returns Power in watts
 */
export function calculateThreePhasePower(voltage, current, powerFactor = 1) {
    const sqrt3 = Math.sqrt(3);
    return sqrt3 * voltage * current * powerFactor;
}
/**
 * Calculate single-phase power
 * P = V × I × PF
 * @param voltage - Voltage in volts
 * @param current - Current in amperes
 * @param powerFactor - Power factor (0-1)
 * @returns Power in watts
 */
export function calculateSinglePhasePower(voltage, current, powerFactor = 1) {
    return voltage * current * powerFactor;
}
//# sourceMappingURL=electrical.js.map