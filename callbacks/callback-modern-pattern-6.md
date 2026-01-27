How do you use callbacks with higher-order functions for code reusability?
?

```javascript
// Higher-order functions accept callbacks for flexible behavior

// Generic data fetcher with callback
function fetchData(url, onSuccess, onError) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(function(data) {
      onSuccess(data); // Execute success callback
    })
    .catch(function(error) {
      onError(error); // Execute error callback
    });
}

// Reusable with different callbacks
fetchData(
  '/api/users',
  function(users) {
    // Success callback: display users
    renderUserList(users);
  },
  function(error) {
    // Error callback: show error
    showError('Failed to load users');
  }
);

fetchData(
  '/api/products',
  function(products) {
    // Different success callback: display products
    renderProductGrid(products);
  },
  function(error) {
    // Same error handling pattern
    showError('Failed to load products');
  }
);
```
