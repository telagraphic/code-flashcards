How do you use has() to check if a key exists in a Map?
?

```javascript
// has(key) returns true if key exists, false otherwise
const userMap = new Map([
  ['alice', { id: 1 }],
  ['bob', { id: 2 }]
]);

// Check existence
if (userMap.has('alice')) {
  console.log('Alice exists');
}

if (!userMap.has('charlie')) {
  console.log('Charlie does not exist');
}

// Practical: Cache validation
const cache = new Map();

function getCachedData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  return null;
}

async function fetchData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetch(`/api/data/${key}`).then(r => r.json());
  cache.set(key, data);
  return data;
}

// Practical: Permission checking
const permissions = new Map([
  ['user:read', true],
  ['user:write', false],
  ['admin:delete', true]
]);

function canPerform(action) {
  return permissions.has(action) && permissions.get(action);
}

if (canPerform('user:read')) {
  displayUsers();
}
```
