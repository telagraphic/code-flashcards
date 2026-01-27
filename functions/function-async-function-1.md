How do you create an async function to fetch user data from an API?
?

```javascript
// Async function for fetching user data
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Usage in a web app
fetchUserData(123)
  .then(user => {
    document.getElementById('username').textContent = user.name;
  });
```
