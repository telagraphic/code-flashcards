How do you add, retrieve, and check for values in a Map?
?

```javascript
// Basic Map operations: set, get, has
const userCache = new Map();

// set(key, value) - Add or update
userCache.set('user123', { name: 'Alice', email: 'alice@example.com' });
userCache.set('user456', { name: 'Bob', email: 'bob@example.com' });

// get(key) - Retrieve value
const user = userCache.get('user123');
console.log(user.name); // 'Alice'

// has(key) - Check if key exists
if (userCache.has('user123')) {
  console.log('User found in cache');
}

// Practical: Cache API responses
const apiCache = new Map();
async function fetchUser(userId) {
  if (apiCache.has(userId)) {
    return apiCache.get(userId); // Return cached
  }
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  apiCache.set(userId, user); // Cache result
  return user;
}
```
