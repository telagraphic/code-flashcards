How do you use .finally() for cleanup code that always runs?
?

```javascript
// .finally() executes regardless of success or failure
let isLoading = true;

fetch('/api/data')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    displayData(data);
  })
  .catch(function(error) {
    showError(error.message);
  })
  .finally(function() {
    // Always executes: cleanup
    isLoading = false;
    hideLoadingSpinner();
    console.log('Request completed');
  });

// .finally() runs after:
// - Successful .then() chain
// - Error in .catch()
// - Any error in the chain
// Perfect for cleanup: loading states, closing connections, etc.
```
