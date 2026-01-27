How do you use callbacks for handling async operations in sequence?
?

```javascript
// Callbacks enable sequential async operations
// Each operation calls the next callback when complete

function loadUserData(userId, callback) {
  fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(function(user) {
      // First callback: user loaded
      loadUserPosts(user.id, function(posts) {
        // Second callback: posts loaded
        loadUserComments(user.id, function(comments) {
          // Third callback: all data loaded
          callback({
            user: user,
            posts: posts,
            comments: comments
          });
        });
      });
    })
    .catch(function(error) {
      callback(null, error);
    });
}

// Usage
loadUserData(123, function(data, error) {
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  // All data loaded, render UI
  renderUserProfile(data.user);
  renderPosts(data.posts);
  renderComments(data.comments);
});
```
