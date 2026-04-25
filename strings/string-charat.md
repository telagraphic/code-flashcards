What is String.prototype.charAt() and how does it work?
?

```javascript
// charAt(index): Returns character at index as string; out-of-range returns ''
// No negative indices (use at() for that).

const str = 'Hello';
console.log(str.charAt(0));   // 'H'
console.log(str.charAt(10)); // ''

// Practical: Get single-char string when iterating by index
// Practical: Form input — get initial
function getInitial(name) {
  return name.trim().charAt(0).toUpperCase();
}
```
