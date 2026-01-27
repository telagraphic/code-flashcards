How do you use forEach() for side effects and batch operations?
?

```javascript
// forEach() useful for side effects and batch operations
const cache = new Map([
  ['user_1', { data: '...', timestamp: Date.now() }],
  ['user_2', { data: '...', timestamp: Date.now() - 3600000 }]
]);

// Batch operation: log all entries
cache.forEach((value, key) => {
  console.log(`Cache entry ${key}:`, value);
});

// Practical: Batch API calls
const userIds = new Map([
  ['user1', 1],
  ['user2', 2],
  ['user3', 3]
]);

const requests = [];
userIds.forEach((id, key) => {
  requests.push(fetch(`/api/users/${id}`));
});

Promise.all(requests).then(responses => {
  console.log('All users fetched');
});

// Practical: Aggregate data with side effects
let totalValue = 0;
const items = new Map([
  ['item1', 10],
  ['item2', 20],
  ['item3', 30]
]);

items.forEach((value) => {
  totalValue += value;
});

console.log(totalValue); // 60

// Note: forEach cannot be stopped with break
// Use for...of loop if you need early termination
```
