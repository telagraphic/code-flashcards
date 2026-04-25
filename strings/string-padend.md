What is String.prototype.padEnd() and how does it work?
?

```javascript
// padEnd(targetLength, padString?): Pads end to targetLength; default pad ' '

console.log('hi'.padEnd(5));      // 'hi   '
console.log('hi'.padEnd(5, '.')); // 'hi...'
console.log('hello'.padEnd(3));   // 'hello' (no truncation)

// Practical: Align columns in logs or table cells
const label = name.padEnd(12);
// Practical: Fixed-width display; padding numbers (e.g. with padStart for numbers)
```
