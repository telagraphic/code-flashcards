What is the BigInt type in JavaScript and how is it used?
?

```javascript
// BigInt: Represents integers larger than Number.MAX_SAFE_INTEGER
// Created with n suffix or BigInt() constructor

const bigInt1 = 9007199254740991n;
const bigInt2 = BigInt(9007199254740991);
const bigInt3 = BigInt('9007199254740991');

// Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9007199254740991
// Numbers beyond this lose precision

// BigInt operations
const a = 10n;
const b = 20n;
console.log(a + b); // 30n
console.log(a * b); // 200n
console.log(a / b); // 0n (integer division)

// Cannot mix BigInt with Number
// console.log(10n + 5); // TypeError
console.log(10n + BigInt(5)); // 15n

// Comparison works
console.log(10n < 20); // true
console.log(10n === 10); // false (different types)

// Practical: Large ID handling
const userId = 9007199254740992n; // Beyond safe integer
const orderId = BigInt('18446744073709551615'); // Very large ID

// Practical: Financial calculations (avoiding floating point errors)
function calculateInterest(principal, rate, years) {
  const principalBig = BigInt(Math.round(principal * 100)); // Convert to cents
  const rateBig = BigInt(Math.round(rate * 10000)); // Convert to basis points
  const yearsBig = BigInt(years);
  
  const interest = (principalBig * rateBig * yearsBig) / 10000n;
  return Number(interest) / 100; // Convert back to dollars
}

// Practical: Cryptography and hashing
function generateLargeRandom() {
  const max = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
  const random = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  return random * random % max;
}

// Practical: Timestamp handling (nanoseconds)
const nanoseconds = 1609459200000000000n; // Large timestamp
const milliseconds = Number(nanoseconds / 1000000n);
const date = new Date(milliseconds);

// Practical: Serialization
const bigIntValue = 12345678901234567890n;
JSON.stringify({ value: bigIntValue.toString() }); // Convert to string for JSON

// Type checking
console.log(typeof bigIntValue); // 'bigint'
console.log(BigInt.isBigInt(bigIntValue)); // true (if available)
```
