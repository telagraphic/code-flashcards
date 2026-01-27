How do you use Array.from() with transformation functions?
?

```javascript
// Array.from() can transform during conversion
const userMap = new Map([
  ['alice', { id: 1, role: 'admin' }],
  ['bob', { id: 2, role: 'user' }]
]);

// Transform entries during conversion
const userArray = Array.from(userMap, ([name, data]) => ({
  username: name,
  userId: data.id,
  role: data.role
}));

console.log(userArray);
// [{ username: 'alice', userId: 1, role: 'admin' }, ...]

// Practical: Convert to array with filtering
const activeUsers = Array.from(userMap, ([name, data]) => ({
  name,
  ...data
})).filter(user => user.active);

// Practical: Create lookup array
const permissions = new Map([
  ['read', true],
  ['write', false],
  ['delete', true]
]);

const permissionList = Array.from(permissions, ([action, enabled]) => ({
  action,
  enabled,
  label: `${action}: ${enabled ? 'allowed' : 'denied'}`
}));

// Practical: Convert Map to array for JSON serialization
const serializable = Array.from(userMap, ([key, value]) => ({
  key,
  value
}));

const json = JSON.stringify(serializable);
```
