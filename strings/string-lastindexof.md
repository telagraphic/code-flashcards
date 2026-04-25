What is String.prototype.lastIndexOf() and how does it work?
?

```javascript
// lastIndexOf(searchStr, fromIndex?): Last index of searchStr, or -1
// fromIndex = start searching backward from (default length).

const str = 'Hello World';
console.log(str.lastIndexOf('l'));   // 9
console.log(str.lastIndexOf('l', 5)); // 3

// Practical: File extension
const lastDot = filename.lastIndexOf('.');
const ext = lastDot === -1 ? '' : filename.slice(lastDot + 1);
// Practical: Get path after last slash
```
