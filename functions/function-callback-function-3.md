How do you use a callback function with setTimeout for delayed execution?
?

```javascript
// Callback function for setTimeout
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = 'notification';
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(function() {
    notification.remove();
  }, 3000);
}

// Usage
showNotification('User saved successfully!');

// Another example: debounce search
let searchTimeout;
function handleSearchInput(event) {
  clearTimeout(searchTimeout);
  const query = event.target.value;
  
  searchTimeout = setTimeout(function() {
    performSearch(query);
  }, 500);
}

document.getElementById('search').addEventListener('input', handleSearchInput);
```
