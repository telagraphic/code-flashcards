How do you use the spread operator to convert a Map to an array?
?

```javascript
// Spread operator (...) converts Map to array of [key, value] pairs
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// Convert to array
const entries = [...productMap];
console.log(entries);
// [['laptop', 999], ['mouse', 25], ['keyboard', 75]]

// Practical: Convert to array for array methods
const products = [...productMap].map(([name, price]) => ({
  name,
  price,
  formatted: `$${price}`
}));

console.log(products);
// [{ name: 'laptop', price: 999, formatted: '$999' }, ...]

// Practical: Clone Map
const clonedMap = new Map([...productMap]);
console.log(clonedMap.size); // 3

// Practical: Merge Maps
const map1 = new Map([['a', 1], ['b', 2]]);
const map2 = new Map([['c', 3], ['d', 4]]);
const merged = new Map([...map1, ...map2]);
console.log(merged.size); // 4
```
