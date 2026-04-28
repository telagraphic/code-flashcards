How do you create a Promise for delayed execution (sleep/delay utility)?
?

```javascript
// Create a delay/sleep utility using Promise
function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

// Usage: wait before executing next code
async function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Wait 3 seconds
  await sleep(3000);
  
  // Then remove notification
  notification.remove();
}

// Practical: retry logic with delay
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```
