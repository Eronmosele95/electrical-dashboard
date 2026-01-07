# Electrical Load Dashboard

A simple, user-friendly calculator for electrical power consumption. Enter voltage and current to instantly see how much power your electrical system uses.

## What Does This App Do?

This calculator helps you understand electrical power in any circuit or system - whether it's a home appliance, industrial equipment, or electrical installation. Just enter two basic measurements (voltage and current), and the app automatically calculates all the important power values.

## The Formulas Explained Simply

### 1. **Real Power (kW)** - The Power That Does Actual Work
This is the electricity that actually performs useful work - running motors, lighting bulbs, heating elements, etc.

**Single Phase Formula:**
```
Power (kW) = Voltage × Current ÷ 1000
```

**Three Phase Formula:**
```
Power (kW) = √3 × Voltage × Current ÷ 1000
```
- √3 (about 1.732) is used because three-phase systems have three power-carrying wires working together

### 2. **Apparent Power (kVA)** - Total Power in the Circuit
This is the total power flowing through the circuit, including both useful power and "wasted" power.

**Formula:** Same as Real Power
```
Apparent Power (kVA) = √3 × Voltage × Current ÷ 1000  (for 3-phase)
```

### 3. **Reactive Power (kVAR)** - Power That Does No Work
Some electrical components (like motors and transformers) store and release energy in magnetic fields. This power bounces back and forth but doesn't do useful work - it just creates heat.

**Formula:**
```
Reactive Power (kVAR) = √(Apparent Power² - Real Power²)
```

### 4. **Power Factor** - Efficiency Rating
A number between 0 and 1 that shows how efficiently your system uses electricity. Higher is better!
- **1.0 = Perfect** - All power does useful work
- **0.9 = Good** - 90% efficiency (typical for industrial equipment)
- **0.7 = Poor** - 70% efficiency (needs improvement)

**Formula:**
```
Power Factor = Real Power ÷ Apparent Power
```

### 5. **Adjusted Power** - Real Power Accounting for Losses
Takes your system's efficiency into account. Motors and equipment aren't 100% efficient - some energy is lost as heat.

**Formula:**
```
Adjusted Power (kW) = Real Power × (Efficiency % ÷ 100)
```

## Why Single Phase vs Three Phase?

**Single Phase (1Ø):**
- Used in homes and small businesses
- Simple calculation: Voltage × Current
- Example: 120V or 240V household circuits

**Three Phase (3Ø):**
- Used in factories and large buildings
- More efficient for big loads
- Calculation uses √3 multiplier because power comes from three wires instead of one

## Features

✅ **Real-time Calculations** - Results update as you type  
✅ **Input Validation** - Prevents errors with smart checking  
✅ **Helpful Tooltips** - Hover over ? icons to learn more  
✅ **Mobile Responsive** - Works on phones, tablets, and computers  
✅ **TypeScript Powered** - Type-safe code for reliability  

## Quick Example

**Scenario:** A factory motor running on 3-phase power
- Voltage: 480V
- Current: 100A
- Efficiency: 90%

**Results:**
- Real Power: 83.1 kW (actual power consumed)
- Apparent Power: 83.1 kVA (total power)
- Adjusted Power: 74.8 kW (accounting for 90% efficiency)

## Usage

1. Enter the **Voltage** (in Volts)
2. Enter the **Current** (in Amperes)
3. Select **Phase Type** (Single or Three Phase)
4. Set **Efficiency** (if known, or leave at 100%)
5. View instant results!

## Development

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run watch        # Auto-compile on changes
npm run serve        # Start local server
```

## Technologies Used

- TypeScript for type-safe code
- Vanilla JavaScript (no frameworks needed)
- CSS3 with responsive design
- HTML5

---

**Made for electricians, engineers, and anyone working with electrical systems!**
