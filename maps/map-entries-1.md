How do you use entries() to iterate over key-value pairs in a Map?
?

```javascript
// entries() returns iterator over [key, value] pairs
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// Iterate entries (default iteration)
for (const [key, value] of productMap.entries()) {
  console.log(`${key}: $${value}`);
}

// Same as default iteration
for (const [key, value] of productMap) {
  console.log(`${key}: $${value}`);
}

// Convert to array
const entries = Array.from(productMap.entries());
console.log(entries);
// [['laptop', 999], ['mouse', 25], ['keyboard', 75]]

// Practical: Transform Map to different structure
const userMap = new Map([
  ['alice', { id: 1, role: 'admin' }],
  ['bob', { id: 2, role: 'user' }]
]);

const userArray = Array.from(userMap.entries()).map(([name, data]) => ({
  name,
  ...data
}));
console.log(userArray);
// [{ name: 'alice', id: 1, role: 'admin' }, ...]
```
