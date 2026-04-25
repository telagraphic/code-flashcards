What is String.prototype.includes() and how does it work?
?

```javascript
// includes(searchStr, fromIndex?): true if contains searchStr; case-sensitive.

const str = 'Hello World';
console.log(str.includes('World')); // true

// Practical: Feature detection (e.g. userAgent), search/filter UI
const filtered = items.filter(item => item.includes(query));
// Practical: Class name / attribute check
if (el?.className.includes('is-active')) el.focus();
```
