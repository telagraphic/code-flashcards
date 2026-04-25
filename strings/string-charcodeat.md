What is String.prototype.charCodeAt() and how does it work?
?

```javascript
// charCodeAt(index): Returns UTF-16 code unit (0–65535) at index; NaN if out of range

const str = 'Hello';
console.log(str.charCodeAt(0)); // 72 ('H')

// Practical: Simple hash; ASCII range checks
function isAsciiLetter(c) {
  const code = c.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
```
