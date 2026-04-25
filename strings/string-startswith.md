What is String.prototype.startsWith() and how does it work?
?

```javascript
// startsWith(searchStr, position?): true if string starts with searchStr at position (default 0)

const str = 'Hello World';
console.log(str.startsWith('Hello'));   // true
console.log(str.startsWith('World', 6)); // true

// Practical: Route/prefix check
if (pathname.startsWith('/dashboard')) { }
// Practical: Auth header
if (header.startsWith('Bearer ')) token = header.slice(7);
```
