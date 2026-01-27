How do you use keys() to iterate over Map keys?
?

```javascript
// keys() returns iterator over Map keys
const productMap = new Map([
  ['laptop', 999],
  ['mouse', 25],
  ['keyboard', 75]
]);

// Iterate keys
for (const key of productMap.keys()) {
  console.log('Product:', key);
}

// Convert to array
const productNames = Array.from(productMap.keys());
console.log(productNames); // ['laptop', 'mouse', 'keyboard']

// Practical: Get all user IDs
const userMap = new Map([
  ['user1', { name: 'Alice' }],
  ['user2', { name: 'Bob' }],
  ['user3', { name: 'Charlie' }]
]);

const userIds = Array.from(userMap.keys());
console.log(userIds); // ['user1', 'user2', 'user3']

// Practical: Validate all required fields exist
const requiredFields = ['email', 'password', 'username'];
const formData = new Map([
  ['email', 'user@example.com'],
  ['password', 'secret123']
]);

const missingFields = requiredFields.filter(field => 
  !Array.from(formData.keys()).includes(field)
);
console.log(missingFields); // ['username']
```
