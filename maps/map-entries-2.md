How do you use entries() for filtering and transforming Map data?
?

```javascript
// entries() useful for operations on both keys and values
const permissions = new Map([
  ['user:read', true],
  ['user:write', false],
  ['admin:read', true],
  ['admin:delete', true]
]);

// Filter entries by value
const enabledPermissions = Array.from(permissions.entries())
  .filter(([key, value]) => value === true)
  .map(([key]) => key);

console.log(enabledPermissions);
// ['user:read', 'admin:read', 'admin:delete']

// Practical: Transform Map to object with filtering
function mapToFilteredObject(map, filterFn) {
  return Object.fromEntries(
    Array.from(map.entries()).filter(filterFn)
  );
}

const activeUsers = mapToFilteredObject(userMap, ([name, data]) => 
  data.active === true
);

// Practical: Process entries with side effects
const cache = new Map([
  ['user_1', { data: '...', timestamp: Date.now() }],
  ['user_2', { data: '...', timestamp: Date.now() - 3600000 }]
]);

// Remove expired entries
const now = Date.now();
for (const [key, value] of cache.entries()) {
  if (now - value.timestamp > 1800000) { // 30 minutes
    cache.delete(key);
  }
}
```
