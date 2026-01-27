How do you use callbacks with async/await error handling patterns?
?

```javascript
// Even with async/await, callbacks are used for error handling

// Try-catch acts as callback pattern for errors
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    
    // Success: process data
    return userData;
  } catch (error) {
    // Error callback equivalent
    console.error('Error:', error);
    throw error;
  }
}

// Usage with callbacks
fetchUserData(123)
  .then(function(userData) {
    // Success callback
    displayUser(userData);
  })
  .catch(function(error) {
    // Error callback
    showError(error.message);
  });

// Modern pattern: async callback wrapper
async function withErrorHandling(asyncFn, onError) {
  try {
    return await asyncFn();
  } catch (error) {
    // Execute error callback
    if (onError) {
      onError(error);
    }
    throw error;
  }
}

// Usage
withErrorHandling(
  async function() {
    return await fetchUserData(123);
  },
  function(error) {
    // Error callback
    console.error('Failed:', error);
  }
);
```
