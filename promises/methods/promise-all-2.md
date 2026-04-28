How do you use Promise.all() with error handling for parallel API calls?
?

```javascript
// Promise.all() with individual error handling
async function loadMultipleUserProfiles(userIds) {
  // Create array of promises
  const userPromises = userIds.map(function(userId) {
    return fetch(`/api/users/${userId}`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(`User ${userId} not found`);
        }
        return response.json();
      })
      .catch(function(error) {
        // Return error object instead of rejecting
        return { error: true, userId, message: error.message };
      });
  });
  
  // Wait for all to complete
  const results = await Promise.all(userPromises);
  
  // Separate successful and failed results
  const users = results.filter(function(r) { return !r.error; });
  const errors = results.filter(function(r) { return r.error; });
  
  return { users, errors };
}

// All requests run in parallel
// Each handles its own errors, so Promise.all() doesn't reject
```
