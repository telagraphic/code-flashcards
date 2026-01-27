How do you use Promise.allSettled() to wait for all promises regardless of success or failure?
?

```javascript
// Promise.allSettled() waits for all promises to settle (fulfill or reject)
// Returns array of results with status for each promise

async function loadMultipleResources(urls) {
  // Create promises for all URLs
  const promises = urls.map(function(url) {
    return fetch(url)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      });
  });
  
  // Wait for all to settle (don't fail fast)
  const results = await Promise.allSettled(promises);
  
  // Process results
  const successful = [];
  const failed = [];
  
  results.forEach(function(result, index) {
    if (result.status === 'fulfilled') {
      successful.push({ url: urls[index], data: result.value });
    } else {
      failed.push({ url: urls[index], error: result.reason.message });
    }
  });
  
  return { successful, failed };
}

// All promises complete, even if some fail
// Useful for batch operations where partial success is acceptable
```
