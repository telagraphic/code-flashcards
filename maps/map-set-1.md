How do you use set() to add and update key-value pairs in a Map?
?

```javascript
// set(key, value) adds or updates entries
const userMap = new Map();

// Add new entries
userMap.set('alice', { id: 1, name: 'Alice', role: 'admin' });
userMap.set('bob', { id: 2, name: 'Bob', role: 'user' });

// Update existing entry
userMap.set('alice', { id: 1, name: 'Alice', role: 'superadmin' });

// Keys can be any type
const objKey = { id: 123 };
userMap.set(objKey, 'Object as key');
userMap.set(123, 'Number as key');
userMap.set(true, 'Boolean as key');

// Practical: Build user lookup by email
const emailToUserMap = new Map();

function addUser(user) {
  emailToUserMap.set(user.email, user);
}

function updateUser(email, updates) {
  if (emailToUserMap.has(email)) {
    const user = emailToUserMap.get(email);
    emailToUserMap.set(email, { ...user, ...updates });
  }
}

// Chaining set() calls
const config = new Map();
config.set('apiUrl', 'https://api.example.com')
      .set('timeout', 5000)
      .set('retries', 3);
```
