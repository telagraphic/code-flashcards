How do you use async/await for cleaner Promise handling?
?

```javascript
// async/await provides synchronous-like syntax for Promises
async function loadUserData(userId) {
  try {
    // await pauses execution until Promise resolves
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    const userData = await response.json();
    
    // Use the data
    displayUser(userData);
    return userData;
  } catch (error) {
    // Handle errors with try/catch
    console.error('Error loading user:', error);
    showErrorMessage(error.message);
  }
}

// Call the async function
loadUserData(123);
```
