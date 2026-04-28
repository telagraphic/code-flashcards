How do you implement a timeout pattern using Promise.race()?
?

```javascript
// Timeout pattern: race between operation and timeout promise
function withTimeout(promise, timeoutMs, timeoutMessage = 'Operation timed out') {
  const timeoutPromise = new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(timeoutMessage));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
}

// Usage: Enforce maximum wait time
async function fetchWithTimeout(url, timeoutMs = 5000) {
  try {
    const response = await withTimeout(
      fetch(url),
      timeoutMs,
      'Request took too long'
    );
    return await response.json();
  } catch (error) {
    if (error.message.includes('timed out')) {
      showErrorMessage('Request timeout. Please try again.');
    }
    throw error;
  }
}

// Practical: API call with timeout
fetchWithTimeout('/api/data', 3000)
  .then(function(data) {
    displayData(data);
  })
  .catch(function(error) {
    handleError(error);
  });

// Prevents hanging requests
// Provides user feedback on slow operations
```
