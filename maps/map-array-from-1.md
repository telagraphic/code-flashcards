How do you use Array.from() to convert a Map to an array?
?

```javascript
// Array.from(map) converts Map to array of [key, value] pairs
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// Convert to array
const entries = Array.from(productMap);
console.log(entries);
// [['laptop', 999], ['mouse', 25], ['keyboard', 75]]

// Same as spread operator
const entries2 = [...productMap];

// Array.from() can also transform during conversion
const products = Array.from(productMap, ([name, price]) => ({
  name,
  price,
  formatted: `$${price}`
}));

console.log(products);
// [{ name: 'laptop', price: 999, formatted: '$999' }, ...]

// Practical: Convert Map values to array
const values = Array.from(productMap.values());
console.log(values); // [999, 25, 75]

// Practical: Convert Map keys to array
const keys = Array.from(productMap.keys());
console.log(keys); // ['laptop', 'mouse', 'keyboard']
```
