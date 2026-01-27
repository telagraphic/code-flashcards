How do you use get() to retrieve values from a Map?
?

```javascript
// get(key) retrieves value for a key
const productMap = new Map([
  ['laptop', { price: 999, stock: 5 }],
  ['mouse', { price: 25, stock: 20 }]
]);

// Get value
const laptop = productMap.get('laptop');
console.log(laptop.price); // 999

// Returns undefined if key doesn't exist
const keyboard = productMap.get('keyboard');
console.log(keyboard); // undefined

// Practical: User lookup
const userMap = new Map();
userMap.set('alice@example.com', { name: 'Alice', id: 1 });
userMap.set('bob@example.com', { name: 'Bob', id: 2 });

function getUserByEmail(email) {
  return userMap.get(email);
}

const user = getUserByEmail('alice@example.com');
if (user) {
  console.log(`Found user: ${user.name}`);
}

// Practical: Configuration values
const config = new Map([
  ['apiUrl', 'https://api.example.com'],
  ['timeout', 5000],
  ['maxRetries', 3]
]);

const apiUrl = config.get('apiUrl');
const timeout = config.get('timeout') || 3000; // Default fallback
```
