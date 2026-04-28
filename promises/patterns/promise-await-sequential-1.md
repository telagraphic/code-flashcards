How do you use await for step-by-step sequential async operations?
?

```javascript
// await makes sequential async code read like synchronous code
async function loadUserDashboard(userId) {
  try {
    // Step 1: Load user
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();
    
    // Step 2: Load user's posts (depends on user.id)
    const postsResponse = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsResponse.json();
    
    // Step 3: Load user's notifications (depends on user.id)
    const notificationsResponse = await fetch(`/api/users/${user.id}/notifications`);
    const notifications = await notificationsResponse.json();
    
    // Step 4: Combine and return
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

// Each await waits for the previous operation to complete
// Operations run in order, one after another
```
