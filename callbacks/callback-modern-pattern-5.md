How do you use callbacks with error-first pattern (Node.js style)?
?

```javascript
// Error-first callback pattern: callback(error, result)
// First parameter is error (null if success), second is result

function readUserData(userId, callback) {
  // Simulate async operation
  setTimeout(function() {
    if (userId < 0) {
      // Error case: pass error as first argument
      callback(new Error('Invalid user ID'), null);
    } else {
      // Success case: pass null for error, data as second argument
      callback(null, {
        id: userId,
        name: 'Alice',
        email: 'alice@example.com'
      });
    }
  }, 1000);
}

// Usage: always check error first
readUserData(123, function(error, userData) {
  if (error) {
    // Handle error
    console.error('Error:', error.message);
    showErrorMessage(error.message);
    return;
  }
  
  // Handle success
  console.log('User data:', userData);
  displayUser(userData);
});

// This pattern ensures errors are always handled
```
