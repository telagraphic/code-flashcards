How do you use Promise.all() to run multiple async operations in parallel?
?

```javascript
// Promise.all() runs promises in parallel and waits for all to complete
async function loadDashboardData(userId) {
  // Start all requests simultaneously
  const [userResponse, postsResponse, notificationsResponse] = await Promise.all([
    fetch(`/api/users/${userId}`),
    fetch(`/api/users/${userId}/posts`),
    fetch(`/api/users/${userId}/notifications`)
  ]);
  
  // Parse all responses
  const [user, posts, notifications] = await Promise.all([
    userResponse.json(),
    postsResponse.json(),
    notificationsResponse.json()
  ]);
  
  return {
    user,
    posts,
    notifications
  };
}

// All requests start at the same time
// Total time = time of slowest request (not sum of all requests)
// If any promise rejects, entire Promise.all() rejects
```
