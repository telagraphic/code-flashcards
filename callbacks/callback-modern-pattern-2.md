How do you use callbacks with Promise methods (.then, .catch, .finally)?
?

```javascript
// Promises use callbacks for handling async operations
// .then() - success callback
// .catch() - error callback  
// .finally() - always executes callback

function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(function(response) {
      // Success callback: handle response
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(function(userData) {
      // Success callback: process data
      displayUser(userData);
      return userData;
    })
    .catch(function(error) {
      // Error callback: handle errors
      console.error('Error fetching user:', error);
      showError(error.message);
    })
    .finally(function() {
      // Always executes: cleanup
      hideLoadingSpinner();
    });
}

// Modern async/await still uses callbacks internally
```
