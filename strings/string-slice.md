What is String.prototype.slice() and how does it work?
?

```javascript
// slice(start, end?): Substring from start to end (end excluded); supports negative indices

const str = 'Hello World';
console.log(str.slice(0, 5));   // 'Hello'
console.log(str.slice(-5));     // 'World'
console.log(str.slice(2, -1));  // 'llo Worl'

// Practical: Truncate with ellipsis; get extension (slice after lastIndexOf)
// Practical: Get last N chars: str.slice(-n)
```
