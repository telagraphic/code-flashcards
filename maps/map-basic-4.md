How do you iterate over a Map using different methods?
?

```javascript
// Multiple ways to iterate over Map
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// 1. for...of with entries() (default iteration)
for (const [key, value] of productMap) {
  console.log(`${key}: $${value}`);
}

// 2. forEach() method
productMap.forEach((value, key) => {
  console.log(`${key} costs $${value}`);
});

// 3. Iterate keys only
for (const key of productMap.keys()) {
  console.log('Product:', key);
}

// 4. Iterate values only
for (const value of productMap.values()) {
  console.log('Price:', value);
}

// Practical: Process user preferences
const userPreferences = new Map([
  ['theme', 'dark'],
  ['language', 'en'],
  ['notifications', true]
]);

userPreferences.forEach((value, key) => {
  applyPreference(key, value);
});
```
