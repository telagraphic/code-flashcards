How do you create an async function that processes multiple API calls sequentially?
?

```javascript
// Async function for sequential API calls
async function loadUserDashboard(userId) {
  try {
    // Fetch user profile
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();
    
    // Then fetch user's posts
    const postsResponse = await fetch(`/api/users/${userId}/posts`);
    const posts = await postsResponse.json();
    
    // Then fetch user's notifications
    const notificationsResponse = await fetch(`/api/users/${userId}/notifications`);
    const notifications = await notificationsResponse.json();
    
    return {
      user,
      posts,
      notifications
    };
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error;
  }
}

// Usage
loadUserDashboard(123)
  .then(dashboard => {
    renderDashboard(dashboard);
  });
```
