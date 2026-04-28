How do you create an async generator function for streaming data?
?

```javascript
// async function* creates an async generator that yields values over time
async function* fetchPaginatedData(endpoint) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    // Fetch current page
    const response = await fetch(`${endpoint}?page=${page}`);
    const data = await response.json();
    
    // Yield each item from current page
    for (const item of data.items) {
      yield item;
    }
    
    // Check if more pages exist
    hasMore = data.hasMore;
    page++;
  }
}

// Usage: Process items as they're fetched
async function displayAllItems() {
  for await (const item of fetchPaginatedData('/api/items')) {
    // Process each item as it's yielded
    renderItem(item);
  }
}

// Items are fetched and processed incrementally
// Memory efficient: doesn't load all data at once
```
