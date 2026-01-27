How do you use a callback with the fetch API for handling responses?
?

```javascript
// fetch API uses callbacks via .then() and .catch()
// These are promise callbacks, but follow the callback pattern

fetch('/api/users')
  .then(function(response) {
    // Callback executed when response is received
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(function(data) {
    // Callback executed when JSON parsing completes
    console.log('Users:', data);
    displayUsers(data);
  })
  .catch(function(error) {
    // Callback executed if an error occurs
    console.error('Fetch error:', error);
    showErrorMessage(error.message);
  });

// Arrow function callbacks
fetch('/api/users')
  .then(response => response.json())
  .then(data => displayUsers(data))
  .catch(error => console.error(error));
```
