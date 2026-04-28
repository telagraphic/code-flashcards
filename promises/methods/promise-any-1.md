How do you use Promise.any() to get the first successful promise?
?

```javascript
// Promise.any() returns first fulfilled promise, ignores rejections
// Only rejects if ALL promises reject

async function fetchFromAnySource(userId) {
  // Try multiple endpoints, use first successful one
  const sources = [
    fetch(`/api/primary/users/${userId}`),
    fetch(`/api/backup/users/${userId}`),
    fetch(`/api/cache/users/${userId}`)
  ];
  
  try {
    // Returns first successful response
    const response = await Promise.any(sources);
    const data = await response.json();
    return data;
  } catch (error) {
    // Only throws if ALL promises rejected
    console.error('All sources failed:', error);
    throw new Error('Unable to fetch user data from any source');
  }
}

// Ignores failures, only cares about first success
// Useful for redundant API endpoints or fallback strategies
```
