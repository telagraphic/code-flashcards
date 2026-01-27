How do you use async for...of for concurrent processing with limits?
?

```javascript
// async for...of with concurrency control

// Practical: Process items with concurrency limit
async function* processWithConcurrency(items, limit, processor) {
  const processing = [];
  let index = 0;
  
  while (index < items.length || processing.length > 0) {
    // Start new tasks up to limit
    while (processing.length < limit && index < items.length) {
      const promise = processor(items[index]).then(result => ({
        index,
        result
      }));
      processing.push(promise);
      index++;
    }
    
    // Wait for one to complete
    if (processing.length > 0) {
      const { result } = await Promise.race(
        processing.map((p, i) => p.then(r => ({ result: r, index: i })))
      );
      
      processing.splice(result.index, 1);
      yield result.result;
    }
  }
}

async function processItems(items) {
  const results = [];
  
  for await (const result of processWithConcurrency(
    items,
    5, // Max 5 concurrent
    async (item) => {
      const response = await fetch(`/api/process/${item.id}`);
      return await response.json();
    }
  )) {
    results.push(result);
  }
  
  return results;
}

// Practical: Batch processing with async iteration
async function* batchProcess(items, batchSize, processor) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(item => processor(item))
    );
    yield results;
  }
}

async function processInBatches(items) {
  for await (const batchResults of batchProcess(items, 10, processItem)) {
    // Process each batch of results
    batchResults.forEach(result => {
      updateUI(result);
    });
  }
}

// Practical: Rate-limited API calls
async function* rateLimitedFetch(urls, delay = 1000) {
  for (const url of urls) {
    const response = await fetch(url);
    yield await response.json();
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

async function fetchMultipleUrls(urls) {
  const results = [];
  for await (const data of rateLimitedFetch(urls, 500)) {
    results.push(data);
  }
  return results;
}
```
