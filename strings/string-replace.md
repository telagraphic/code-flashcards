What is String.prototype.replace() and how does it work?
?

```javascript
// replace(pattern, replacement): Replaces first match (or all if pattern is global)
// replacement can be string or function.

const str = 'Hello World';
console.log(str.replace('World', 'JS'));     // 'Hello JS'
console.log(str.replace(/l/g, 'L'));         // 'HeLLo WorLd'

// Practical: Sanitize for display (first occurrence)
const safe = userInput.replace(/</g, '&lt;');
// Practical: Replacer function for dynamic replacement
'x-y-z'.replace(/-(\w)/g, (_, c) => c.toUpperCase()); // 'xYz'
```
