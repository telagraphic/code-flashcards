What is String.prototype.trim() and how does it work?
?

```javascript
// trim(): Removes whitespace from both ends (space, tab, NL, etc.)

const str = '  Hello  ';
console.log(str.trim()); // 'Hello'

// Practical: Form input before validation or submit
const value = input.value.trim();
// Practical: Normalize before length or comparison
if (username.trim().length === 0) return;
```
