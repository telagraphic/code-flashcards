What is String.prototype.match() and how does it work?
?

```javascript
// match(regexp): Returns match result: array (with groups) or null
// Without g: first match + groups. With g: all matches (no groups).

const str = 'Hello World';
console.log(str.match(/l/g));     // ['l', 'l', 'l']
console.log(str.match(/(\w+) (\w+)/)); // ['Hello World', 'Hello', 'World']

// Practical: Extract first match or capture groups
const match = pathname.match(/^\/posts\/(\d+)/);
const id = match ? match[1] : null;
```
