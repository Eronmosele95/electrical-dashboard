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
export declare function calculatePower(voltage: number, current: number): number;
/**
 * Calculate apparent power (S = V × I)
 * @param voltage - Voltage in volts
 * @param current - Current in amperes
 * @returns Apparent power in volt-amperes (VA)
 */
export declare function calculateApparentPower(voltage: number, current: number): number;
/**
 * Calculate power factor
 * @param realPower - Real power in watts
 * @param apparentPower - Apparent power in volt-amperes
 * @returns Power factor (0-1)
 */
export declare function calculatePowerFactor(realPower: number, apparentPower: number): number;
/**
 * Convert watts to kilowatts
 * @param watts - Power in watts
 * @returns Power in kilowatts
 */
export declare function wattsToKilowatts(watts: number): number;
/**
 * Convert kilowatts to watts
 * @param kilowatts - Power in kilowatts
 * @returns Power in watts
 */
export declare function kilowattsToWatts(kilowatts: number): number;
/**
 * Calculate reactive power using power triangle
 * Q = √(S² - P²)
 * @param apparentPower - Apparent power (S) in VA
 * @param realPower - Real power (P) in W
 * @returns Reactive power (Q) in VAR
 */
export declare function calculateReactivePower(apparentPower: number, realPower: number): number;
/**
 * Calculate three-phase power
 * P = √3 × V × I × PF
 * @param voltage - Line voltage in volts
 * @param current - Current in amperes
 * @param powerFactor - Power factor (0-1)
 * @returns Power in watts
 */
export declare function calculateThreePhasePower(voltage: number, current: number, powerFactor?: number): number;
/**
 * Calculate single-phase power
 * P = V × I × PF
 * @param voltage - Voltage in volts
 * @param current - Current in amperes
 * @param powerFactor - Power factor (0-1)
 * @returns Power in watts
 */
export declare function calculateSinglePhasePower(voltage: number, current: number, powerFactor?: number): number;
//# sourceMappingURL=electrical.d.ts.map