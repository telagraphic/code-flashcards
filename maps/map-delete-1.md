How do you use delete() to remove specific entries from a Map?
?

```javascript
// delete(key) removes a key-value pair, returns true if existed
const sessionMap = new Map([
  ['session1', { userId: 1, expires: Date.now() + 3600000 }],
  ['session2', { userId: 2, expires: Date.now() + 3600000 }],
  ['session3', { userId: 3, expires: Date.now() + 3600000 }]
]);

// Delete specific session
const deleted = sessionMap.delete('session1');
console.log(deleted); // true (key existed)
console.log(sessionMap.size); // 2

// Delete non-existent key
const notFound = sessionMap.delete('session999');
console.log(notFound); // false (key didn't exist)

// Practical: Remove expired sessions
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, session] of sessionMap) {
    if (session.expires < now) {
      sessionMap.delete(sessionId);
    }
  }
}

// Practical: Remove user from cache
const userCache = new Map();

function removeUser(userId) {
  if (userCache.has(userId)) {
    userCache.delete(userId);
    console.log(`User ${userId} removed from cache`);
  }
}
```
