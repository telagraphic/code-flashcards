What is the Number type in JavaScript and how is it used?
?

```javascript
// Number: Represents numeric values (integers and floats)
// IEEE 754 double-precision floating-point format

const integer = 42;
const float = 3.14;
const scientific = 1e6; // 1000000
const hex = 0xFF; // 255
const binary = 0b1010; // 10

// Special number values
const infinity = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

// Number methods and properties
const num = 123.456;
console.log(num.toFixed(2)); // '123.46'
console.log(num.toPrecision(4)); // '123.5'
console.log(Number.isInteger(num)); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(num)); // true

// Practical: Form input parsing
function parseNumberInput(value) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    throw new Error('Invalid number');
  }
  return num;
}

// Practical: Currency formatting
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

formatCurrency(1234.56); // '$1,234.56'

// Practical: Percentage calculation
function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

// Practical: Random number generation
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Practical: Number validation
function isValidNumber(value) {
  return typeof value === 'number' && 
         Number.isFinite(value) && 
         !Number.isNaN(value);
}

// Practical: Clamping values
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Number precision issues
console.log(0.1 + 0.2); // 0.30000000000000004
// Use Number.EPSILON for comparisons
function areEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
```
