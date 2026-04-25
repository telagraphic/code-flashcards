What is String.prototype.padStart() and how does it work?
?

```javascript
// padStart(targetLength, padString?): Pads start to targetLength; default ' '

console.log('5'.padStart(3, '0'));   // '005'
console.log('42'.padStart(5));       // '  42'

// Practical: Zero-pad numbers (dates, IDs)
const d = String(day).padStart(2, '0');
const month = String(m).padStart(2, '0');
// Practical: Align numbers in UI; fixed-width strings
```
