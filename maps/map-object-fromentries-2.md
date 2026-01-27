How do you use Object.fromEntries() for data transformation and API responses?
?

```javascript
// Object.fromEntries() useful for transforming Map data
const userMap = new Map([
  ['alice', { id: 1, email: 'alice@example.com' }],
  ['bob', { id: 2, email: 'bob@example.com' }]
]);

// Transform during conversion
const userObj = Object.fromEntries(
  Array.from(userMap).map(([name, data]) => [
    name,
    { ...data, displayName: name.toUpperCase() }
  ])
);

console.log(userObj);
// { alice: { id: 1, email: '...', displayName: 'ALICE' }, ... }

// Practical: Create lookup object from Map
const permissions = new Map([
  ['user:read', true],
  ['user:write', false]
]);

const permissionObj = Object.fromEntries(permissions);
console.log(permissionObj);
// { 'user:read': true, 'user:write': false }

// Practical: Convert API response Map to object
async function fetchUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();
  
  // Convert array to Map, then to object
  const userMap = new Map(users.map(u => [u.id, u]));
  const userObj = Object.fromEntries(userMap);
  
  return userObj; // { 1: { id: 1, name: '...' }, 2: { id: 2, ... } }
}

// Note: Object keys are always strings
// Numbers/objects as Map keys become string keys in object
```
