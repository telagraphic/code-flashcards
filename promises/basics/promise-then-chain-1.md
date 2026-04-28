How do you chain multiple .then() calls for sequential async operations?
?

```javascript
// Chain .then() calls for sequential data processing
fetch('/api/users/123')
  .then(function(response) {
    // First step: get response
    return response.json();
  })
  .then(function(userData) {
    // Second step: use user data to fetch posts
    return fetch(`/api/users/${userData.id}/posts`);
  })
  .then(function(response) {
    // Third step: parse posts
    return response.json();
  })
  .then(function(posts) {
    // Fourth step: display posts
    renderPosts(posts);
  })
  .catch(function(error) {
    // Handle errors from any step
    console.error('Error in chain:', error);
  });

// Each .then() receives the return value from previous step
// Promises chain together automatically
```
