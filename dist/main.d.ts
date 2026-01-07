interface ValidationRule {
    min: number;
    max: number;
    required: boolean;
    description: string;
}
interface ValidationResult {
    isValid: boolean;
    errors: string[];
}
interface CalculationResult {
    kw: number;
    kva: number;
    kvar: number;
    pf: number;
    adjustedPower: number;
    phase: number;
    costPerHour: number;
    costPerDay: number;
    costPerMonth: number;
    costPerYear: number;
}
interface HistoryItem {
    id: string;
    timestamp: number;
    voltage: number;
    current: number;
    phase: number;
    powerFactor: number;
    efficiency: number;
    rate: number;
    result: CalculationResult;
}
interface InputValues {
    voltage: number;
    current: number;
    phase: number;
    powerFactor: number;
    efficiency: number;
    rate: number;
}
interface Window {
    loadHistoryItem: (id: string) => void;
    deleteHistoryItem: (id: string) => void;
}
declare const voltageInput: HTMLInputElement;
declare const currentInput: HTMLInputElement;
declare const phaseSelect: HTMLSelectElement;
declare const powerFactorInput: HTMLInputElement;
declare const efficiencyInput: HTMLInputElement;
declare const electricityRateInput: HTMLInputElement;
declare const resultsDiv: HTMLDivElement;
declare const themeToggle: HTMLButtonElement;
declare const saveButton: HTMLButtonElement;
declare const clearHistoryButton: HTMLButtonElement;
declare const historyList: HTMLDivElement;
declare const VALIDATION_RULES: Record<string, ValidationRule>;
declare function validateInputs(voltage: number, current: number, powerFactor: number, efficiency: number): ValidationResult;
declare function displayErrors(errors: string[]): void;
declare function calculatePower(voltage: number, current: number, phase: number, powerFactor: number, efficiency: number, rate: number): CalculationResult;
declare function displayResults(result: CalculationResult): void;
declare function getInputValues(): InputValues;
declare function updateCalculations(): void;
declare function initTheme(): void;
declare function toggleTheme(): void;
declare function updateThemeIcon(theme: string): void;
declare function saveCalculation(): void;
declare function getHistory(): HistoryItem[];
declare function clearHistory(): void;
declare function deleteHistoryItem(id: string): void;
declare function loadHistoryItem(id: string): void;
declare function displayHistory(): void;
declare function initializeApp(): void;
//# sourceMappingURL=main.d.ts.map