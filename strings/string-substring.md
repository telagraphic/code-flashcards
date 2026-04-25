What is String.prototype.substring() and how does it work?
?

```javascript
// substring(start, end?): Substring between start and end (no negative indices)
// Swaps start/end if start > end; treats negative as 0.

const str = 'Hello World';
console.log(str.substring(0, 5));  // 'Hello'
console.log(str.substring(6));     // 'World'

// Practical: Truncate (substring(0, max)); extract after index
// Prefer slice() when you need negative indices.
```
