How do you use keys() for filtering and operations on Map keys?
?

```javascript
// keys() useful for operations on keys only
const permissions = new Map([
  ['user:read', true],
  ['user:write', false],
  ['admin:read', true],
  ['admin:delete', true]
]);

// Get all admin permissions
const adminPermissions = Array.from(permissions.keys())
  .filter(key => key.startsWith('admin:'));

console.log(adminPermissions); // ['admin:read', 'admin:delete']

// Practical: Find keys matching pattern
function findKeysByPattern(map, pattern) {
  return Array.from(map.keys()).filter(key => 
    key.includes(pattern)
  );
}

const userKeys = findKeysByPattern(permissions, 'user:');
console.log(userKeys); // ['user:read', 'user:write']

// Practical: Batch operations on keys
const cache = new Map([
  ['user_1', 'data1'],
  ['user_2', 'data2'],
  ['post_1', 'data3'],
  ['post_2', 'data4']
]);

// Invalidate all user cache
function invalidateUserCache() {
  const userKeys = Array.from(cache.keys())
    .filter(key => key.startsWith('user_'));
  
  userKeys.forEach(key => cache.delete(key));
}

invalidateUserCache();
console.log(cache.size); // 2 (only post_ keys remain)
```
