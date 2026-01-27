How do you use the size property to get the number of entries in a Map?
?

```javascript
// size property returns number of key-value pairs
const userMap = new Map([
  ['alice', { id: 1 }],
  ['bob', { id: 2 }],
  ['charlie', { id: 3 }]
]);

console.log(userMap.size); // 3

// Size updates automatically
userMap.set('diana', { id: 4 });
console.log(userMap.size); // 4

userMap.delete('alice');
console.log(userMap.size); // 3

// Practical: Check if Map is empty
function isEmpty(map) {
  return map.size === 0;
}

if (isEmpty(userMap)) {
  console.log('No users found');
}

// Practical: Limit cache size
const cache = new Map();
const MAX_CACHE_SIZE = 100;

function addToCache(key, value) {
  if (cache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entry (first key)
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, value);
}
```
