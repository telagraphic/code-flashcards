How do you use chained .catch() for fallback strategies?
?

```javascript
// Multiple .catch() handlers for different error scenarios
fetch('/api/users/123')
  .then(function(response) {
    return response.json();
  })
  .catch(function(error) {
    // First fallback: try cache
    console.log('Primary failed, trying cache');
    return fetch('/api/cache/users/123')
      .then(function(r) { return r.json(); });
  })
  .catch(function(error) {
    // Second fallback: use default data
    console.log('Cache failed, using defaults');
    return {
      id: 123,
      name: 'Guest User',
      avatar: '/default-avatar.png'
    };
  })
  .then(function(userData) {
    // Display user (from primary, cache, or default)
    displayUser(userData);
  })
  .catch(function(error) {
    // Final error handler
    showCriticalError('Unable to load user');
  });

// Each .catch() can attempt recovery
// Chain continues with recovered value
```
