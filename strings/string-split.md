What is String.prototype.split() and how does it work?
?

```javascript
// split(separator?, limit?): Splits into array; limit caps length

const str = 'a,b,c';
console.log(str.split(','));      // ['a', 'b', 'c']
console.log(str.split(/,/, 2));   // ['a', 'b']
console.log('hi'.split(''));      // ['h', 'i']

// Practical: Parse CSV line; path segments: path.split('/')
// Practical: Split then map/trim for form inputs
const parts = input.split(',').map(s => s.trim());
```
