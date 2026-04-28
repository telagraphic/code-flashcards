How do you handle a Promise result using .then() and .catch()?
?

```javascript
// Promise with .then() for success and .catch() for errors
fetch('/api/users')
  .then(function(response) {
    // Handle successful response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    // Handle parsed JSON data
    console.log('Users:', data);
    displayUsers(data);
  })
  .catch(function(error) {
    // Handle any errors
    console.error('Error:', error);
    showErrorMessage(error.message);
  });

// .then() chains success handlers
// .catch() handles errors from any point in the chain
```
