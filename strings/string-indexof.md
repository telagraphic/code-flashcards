What is String.prototype.indexOf() and how does it work?
?

```javascript
// indexOf(searchStr, fromIndex?): First index of searchStr, or -1

const str = 'Hello World';
console.log(str.indexOf('l'));     // 2
console.log(str.indexOf('xyz'));   // -1
console.log(str.indexOf('l', 3));  // 3

// Practical: Extract after a token (e.g. "Bearer xxx")
const token = header.indexOf('Bearer ') === 0 ? header.slice(7) : null;
// Practical: Count occurrences; slice from first occurrence
```
