How do you create a reusable timeout utility for any async operation?
?

```javascript
// Generic timeout wrapper for any Promise
function timeout(ms, message = 'Timeout') {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(message));
    }, ms);
  });
}

// Wrap any async operation with timeout
async function operationWithTimeout(operationPromise, timeoutMs) {
  return Promise.race([
    operationPromise,
    timeout(timeoutMs, `Operation exceeded ${timeoutMs}ms`)
  ]);
}

// Usage examples
async function examples() {
  // Timeout for API call
  try {
    const data = await operationWithTimeout(
      fetch('/api/slow-endpoint').then(r => r.json()),
      5000
    );
    console.log('Data:', data);
  } catch (error) {
    if (error.message.includes('exceeded')) {
      console.log('Request timed out');
    }
  }
  
  // Timeout for user action
  const userChoice = await operationWithTimeout(
    waitForUserInput(),
    10000
  );
  
  // Timeout for file upload
  const uploadResult = await operationWithTimeout(
    uploadLargeFile(file),
    60000
  );
}

// Prevents indefinite waiting
// Improves user experience with predictable timeouts
```
