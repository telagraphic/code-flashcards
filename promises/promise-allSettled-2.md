How do you use Promise.allSettled() for retry logic with fallback strategies?
?

```javascript
// Promise.allSettled() useful when you need all results, even failures
async function fetchFromMultipleSources(userId) {
  // Try multiple API endpoints simultaneously
  const sources = [
    fetch(`/api/v1/users/${userId}`),
    fetch(`/api/v2/users/${userId}`),
    fetch(`/api/cache/users/${userId}`)
  ];
  
  const results = await Promise.allSettled(sources);
  
  // Find first successful result
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === 'fulfilled') {
      const response = result.value;
      if (response.ok) {
        const data = await response.json();
        return { source: i, data };
      }
    }
  }
  
  // All failed
  throw new Error('All data sources failed');
}

// Try all sources in parallel
// Use first successful result
// Don't fail if some sources fail
```
