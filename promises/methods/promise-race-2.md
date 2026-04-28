How do you use Promise.race() for implementing request timeouts?
?

```javascript
// Promise.race() pattern for enforcing maximum wait time
function createTimeoutPromise(ms, message = 'Operation timed out') {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(message));
    }, ms);
  });
}

// Race between actual operation and timeout
async function fetchWithDeadline(url, deadlineMs) {
  const fetchPromise = fetch(url).then(function(r) { return r.json(); });
  const timeoutPromise = createTimeoutPromise(deadlineMs);
  
  try {
    const data = await Promise.race([fetchPromise, timeoutPromise]);
    return data;
  } catch (error) {
    if (error.message.includes('timed out')) {
      // Show user-friendly timeout message
      showErrorMessage('Request took too long. Please try again.');
    }
    throw error;
  }
}

// Usage: enforce 3 second deadline
fetchWithDeadline('/api/data', 3000)
  .then(function(data) {
    displayData(data);
  })
  .catch(function(error) {
    handleError(error);
  });
```
