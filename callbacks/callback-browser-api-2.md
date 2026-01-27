How do you use a callback with setTimeout for delayed execution?
?

```javascript
// setTimeout takes a callback function and delay in milliseconds
// The callback executes after the delay

// Basic usage
setTimeout(function() {
  console.log('This runs after 2 seconds');
  document.getElementById('message').textContent = 'Welcome!';
}, 2000);

// Practical example: show notification then hide it
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.className = 'notification';
  document.body.appendChild(notification);
  
  // Callback to remove notification after 3 seconds
  setTimeout(function() {
    notification.remove();
  }, 3000);
}

showNotification('User saved successfully!');
```
