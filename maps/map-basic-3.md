How do you remove items and get the size of a Map?
?

```javascript
// Map deletion and size operations
const sessionData = new Map();

// Add items
sessionData.set('userId', 123);
sessionData.set('token', 'abc123');
sessionData.set('expires', Date.now() + 3600000);

// size property - Get number of entries
console.log(sessionData.size); // 3

// delete(key) - Remove specific entry
sessionData.delete('token');
console.log(sessionData.size); // 2

// clear() - Remove all entries
sessionData.clear();
console.log(sessionData.size); // 0

// Practical: Session management
class SessionManager {
  constructor() {
    this.sessions = new Map();
  }
  
  createSession(userId) {
    const sessionId = `session_${Date.now()}`;
    this.sessions.set(sessionId, { userId, createdAt: Date.now() });
    return sessionId;
  }
  
  removeSession(sessionId) {
    this.sessions.delete(sessionId);
  }
  
  clearExpiredSessions() {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (now - session.createdAt > 3600000) {
        this.sessions.delete(id);
      }
    }
  }
  
  getActiveSessionCount() {
    return this.sessions.size;
  }
}
```
