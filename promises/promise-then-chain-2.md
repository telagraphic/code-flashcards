How do you use Promise.resolve() for chaining transformations?
?

```javascript
// Promise.resolve() starts a chain with an immediate value
function processUserData(userId) {
  return Promise.resolve(userId)
    .then(function(id) {
      // Transform: add prefix
      return `user_${id}`;
    })
    .then(function(userKey) {
      // Transform: fetch user
      return fetch(`/api/users/${userKey}`);
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(user) {
      // Transform: add computed fields
      return {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        initials: `${user.firstName[0]}${user.lastName[0]}`
      };
    });
}

// Usage
processUserData(123)
  .then(function(enrichedUser) {
    displayUserProfile(enrichedUser);
  });

// Promise.resolve() converts any value to a Promise
// Useful for starting chains or normalizing async/sync code
```
