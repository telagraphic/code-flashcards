What is String.prototype.toLowerCase() and how does it work?
?

```javascript
// toLowerCase(): Returns string in lower case (locale-insensitive for ASCII)

console.log('Hello'.toLowerCase()); // 'hello'

// Practical: Normalize for comparison or slug
const slug = title.toLowerCase().replaceAll(/\s+/g, '-');
// Practical: Case-insensitive filter
items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
```
