How do you use .catch() for basic error handling in Promise chains?
?

```javascript
// .catch() handles errors anywhere in the Promise chain
fetch('/api/users/123')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  })
  .then(function(user) {
    // Process user data
    return fetch(`/api/users/${user.id}/posts`);
  })
  .catch(function(error) {
    // Catches errors from any .then() above
    console.error('Error:', error.message);
    showErrorMessage('Failed to load user data');
    return null; // Return fallback value
  })
  .then(function(posts) {
    // This runs even if error occurred (receives null)
    if (posts) {
      displayPosts(posts);
    }
  });

// .catch() can return a value to continue the chain
// Or re-throw to propagate error
```
