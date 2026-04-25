What is String.prototype.endsWith() and how does it work?
?

```javascript
// endsWith(searchStr, endPosition?): true if string ends with searchStr
// endPosition = length to consider (default full length).

const str = 'Hello World';
console.log(str.endsWith('World'));   // true
console.log(str.endsWith('lo', 5));   // true

// Practical: File extension check
function isJSFile(filename) { return filename.endsWith('.js'); }
// Practical: Email domain, API route suffix
```
