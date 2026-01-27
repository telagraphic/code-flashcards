How do you use Object.fromEntries() to convert a Map to an object?
?

```javascript
// Object.fromEntries() converts Map (or array of entries) to object
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// Convert Map to object
const productObj = Object.fromEntries(productMap);
console.log(productObj);
// { laptop: 999, mouse: 25, keyboard: 75 }

// Also works with array of entries
const entries = [['a', 1], ['b', 2]];
const obj = Object.fromEntries(entries);
console.log(obj); // { a: 1, b: 2 }

// Practical: Convert Map to object for JSON
const userMap = new Map([
  ['alice', { id: 1, role: 'admin' }],
  ['bob', { id: 2, role: 'user' }]
]);

const userObj = Object.fromEntries(userMap);
const json = JSON.stringify(userObj);
console.log(json);

// Practical: Convert configuration Map to object
const config = new Map([
  ['apiUrl', 'https://api.example.com'],
  ['timeout', 5000],
  ['retries', 3]
]);

const configObj = Object.fromEntries(config);
console.log(configObj);
// { apiUrl: 'https://api.example.com', timeout: 5000, retries: 3 }
```
