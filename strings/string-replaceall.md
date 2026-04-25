What is String.prototype.replaceAll() and how does it work?
?

```javascript
// replaceAll(pattern, replacement): Replaces all matches
// pattern: string or global regex. Replacement: string or function.

const str = 'a-b-c';
console.log(str.replaceAll('-', '_'));  // 'a_b_c'
console.log(str.replaceAll(/./g, '*')); // '*****'

// Practical: Normalize separators (spaces, dashes)
const slug = title.toLowerCase().replaceAll(/\s+/g, '-');
// Practical: Escape all occurrences for HTML
const escaped = raw.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
```
