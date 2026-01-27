How do you use forEach() to execute a function for each Map entry?
?

```javascript
// forEach(callback) executes function for each [key, value] pair
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// forEach callback: (value, key, map) => void
productMap.forEach(function(value, key) {
  console.log(`${key}: $${value}`);
});

// Arrow function syntax
productMap.forEach((value, key) => {
  console.log(`Product ${key} costs $${value}`);
});

// Practical: Update UI for each entry
const userMap = new Map([
  ['alice', { name: 'Alice', online: true }],
  ['bob', { name: 'Bob', online: false }]
]);

userMap.forEach((user, userId) => {
  const status = user.online ? 'online' : 'offline';
  updateUserStatus(userId, status);
});

// Note: forEach doesn't return a value (unlike map())
// Use for side effects, not transformations
```
