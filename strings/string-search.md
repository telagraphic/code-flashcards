What is String.prototype.search() and how does it work?
?

```javascript
// search(regexp): Returns index of first match, or -1 (always first match only)

const str = 'Hello World';
console.log(str.search(/World/));  // 6
console.log(str.search(/\d/));     // -1

// Practical: Check if pattern exists (boolean)
if (pathname.search(/^\/admin/) !== -1) { /* admin route */ }
// Practical: Get start index for slice/substring (single match)
```
