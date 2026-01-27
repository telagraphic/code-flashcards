How do you use delete() for cache invalidation and cleanup?
?

```javascript
// delete() useful for cache invalidation
const apiCache = new Map();

async function fetchUser(userId) {
  const cacheKey = `user_${userId}`;
  
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }
  
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  apiCache.set(cacheKey, user);
  return user;
}

// Invalidate specific cache entry
function invalidateUserCache(userId) {
  apiCache.delete(`user_${userId}`);
}

// Invalidate all user-related cache
function invalidateAllUserCache() {
  for (const [key] of apiCache) {
    if (key.startsWith('user_')) {
      apiCache.delete(key);
    }
  }
}

// Practical: Event listener cleanup
const eventListeners = new Map();

function addEventListener(element, event, handler) {
  element.addEventListener(event, handler);
  eventListeners.set(`${element.id}_${event}`, { element, event, handler });
}

function removeEventListener(element, event) {
  const key = `${element.id}_${event}`;
  if (eventListeners.has(key)) {
    const { handler } = eventListeners.get(key);
    element.removeEventListener(event, handler);
    eventListeners.delete(key);
  }
}
```
