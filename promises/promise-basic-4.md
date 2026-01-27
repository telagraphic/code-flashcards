How do you combine .then(), .catch(), and .finally() for complete Promise handling?
?

```javascript
// Complete Promise chain with all methods
function fetchUserProfile(userId) {
  let isLoading = true;
  
  return fetch(`/api/users/${userId}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(function(userData) {
      // Success: process and return data
      return {
        ...userData,
        displayName: `${userData.firstName} ${userData.lastName}`
      };
    })
    .catch(function(error) {
      // Error: log and provide fallback
      console.error('Fetch error:', error);
      return { error: true, message: error.message };
    })
    .finally(function() {
      // Always executes: cleanup
      isLoading = false;
      hideLoadingSpinner();
    });
}

// Usage
fetchUserProfile(123)
  .then(function(result) {
    if (result.error) {
      showError(result.message);
    } else {
      displayProfile(result);
    }
  });
```
