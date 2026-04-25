What is String.prototype.concat() and how does it work?
?

```javascript
// concat(...str): Concatenates strings; returns new string. Prefer template literals.

console.log('Hello'.concat(' ', 'World')); // 'Hello World'

// Practical: Building from array with custom separator
const parts = ['React', 'Vue', 'Svelte'];
const withPipe = parts.reduce((acc, p, i) => acc.concat(i ? ' | ' : '', p), '');
```
