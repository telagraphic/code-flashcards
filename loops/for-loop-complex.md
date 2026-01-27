What is a complex scenario using for loops in modern web apps?
?

```javascript
// Complex: Multi-step data processing pipeline with error handling

// Practical: Batch API requests with retry logic and rate limiting
async function batchProcessUsers(userIds, batchSize = 5, maxRetries = 3) {
  const results = [];
  const errors = [];
  
  // Process in batches
  for (let batchStart = 0; batchStart < userIds.length; batchStart += batchSize) {
    const batch = userIds.slice(batchStart, batchStart + batchSize);
    
    // Process each user in batch
    for (let i = 0; i < batch.length; i++) {
      const userId = batch[i];
      let retryCount = 0;
      let success = false;
      
      // Retry logic
      while (retryCount < maxRetries && !success) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const user = await response.json();
            results.push(user);
            success = true;
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) {
            errors.push({ userId, error: error.message });
          } else {
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }
    }
    
    // Rate limiting between batches
    if (batchStart + batchSize < userIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return { results, errors };
}

// Complex: Multi-dimensional data transformation
function transformNestedData(data, transformations) {
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const transformed = {};
    
    // Apply transformations
    for (let j = 0; j < transformations.length; j++) {
      const transform = transformations[j];
      const key = transform.key;
      
      if (transform.type === 'map' && item[key]) {
        transformed[transform.newKey] = transform.fn(item[key]);
      } else if (transform.type === 'filter' && item[key]) {
        if (!transform.fn(item[key])) {
          continue; // Skip this item
        }
      } else if (transform.type === 'calculate') {
        transformed[transform.newKey] = transform.fn(item);
      }
    }
    
    result.push({ ...item, ...transformed });
  }
  
  return result;
}

// Complex: Pagination with nested data processing
async function processPaginatedData(endpoint, processor) {
  let page = 1;
  let hasMore = true;
  const allResults = [];
  
  while (hasMore) {
    const response = await fetch(`${endpoint}?page=${page}&limit=20`);
    const data = await response.json();
    
    // Process each item in page
    for (let i = 0; i < data.items.length; i++) {
      const processed = await processor(data.items[i]);
      allResults.push(processed);
    }
    
    hasMore = data.hasMore;
    page++;
    
    // Prevent infinite loops
    if (page > 100) {
      console.warn('Max pages reached');
      break;
    }
  }
  
  return allResults;
}
```
