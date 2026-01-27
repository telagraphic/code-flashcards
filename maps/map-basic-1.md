What is a Map in JavaScript and how do you create one?
?

```javascript
// Map is a collection of key-value pairs
// Unlike objects, Map keys can be any type (objects, functions, primitives)

// Create empty Map
const userMap = new Map();

// Create Map with initial values
const productMap = new Map([
  ['id', 123],
  ['name', 'Laptop'],
  ['price', 999.99]
]);

// Map vs Object:
// - Map preserves insertion order
// - Map has size property
// - Map keys can be any type
// - Better performance for frequent additions/deletions

console.log(productMap.size); // 3
```
