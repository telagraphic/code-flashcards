How do you use Promise.race() to get the first completed promise?
?

```javascript
// Promise.race() returns the first promise that settles (fulfills or rejects)
async function fetchWithTimeout(url, timeoutMs = 5000) {
  // Race between fetch and timeout
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error('Request timeout'));
    }, timeoutMs);
  });
  
  try {
    // Returns whichever completes first
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return await response.json();
  } catch (error) {
    if (error.message === 'Request timeout') {
      console.error('Request took too long');
    }
    throw error;
  }
}

// Practical: race between multiple API endpoints
const fastestData = await Promise.race([
  fetch('/api/primary'),
  fetch('/api/backup'),
  fetch('/api/cache')
]);
```
