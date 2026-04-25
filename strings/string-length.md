What is the String length property and how does it work?
?

```javascript
// length: Read-only; number of UTF-16 code units (not always visible characters).

const str = 'Hello';
console.log(str.length); // 5
console.log('😀'.length); // 2 (surrogate pair)

// Practical: Truncate for UI
function truncate(text, max) {
  return text.length > max ? text.slice(0, max) + '...' : text;
}
// Practical: Validation min/max length; empty check (str.length === 0)
```
