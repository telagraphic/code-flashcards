How do you use async for...of for streaming and pagination?
?

```javascript
// async for...of for streaming data

// Practical: Paginated API data loading
async function* fetchPaginatedData(endpoint) {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`${endpoint}?page=${page}&limit=20`);
    const data = await response.json();
    
    yield data.items;
    
    hasMore = data.hasMore;
    page++;
  }
}

async function loadAllData(endpoint) {
  const allItems = [];
  
  for await (const items of fetchPaginatedData(endpoint)) {
    allItems.push(...items);
    // Update UI progress
    updateProgress(allItems.length);
  }
  
  return allItems;
}

// Practical: Process file chunks
async function* readFileInChunks(file, chunkSize = 1024) {
  let offset = 0;
  
  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);
    const text = await chunk.text();
    yield text;
    offset += chunkSize;
  }
}

async function processLargeFile(file) {
  for await (const chunk of readFileInChunks(file)) {
    // Process each chunk
    parseChunk(chunk);
  }
}

// Practical: Real-time event stream
async function* createEventStream(eventSource) {
  return new Promise((resolve) => {
    const events = [];
    let resolver = resolve;
    
    eventSource.addEventListener('message', (event) => {
      events.push(JSON.parse(event.data));
      if (resolver) {
        resolver({ value: events.shift(), done: false });
        resolver = null;
      }
    });
    
    // Yield events as they arrive
    async function* generator() {
      while (true) {
        if (events.length > 0) {
          yield events.shift();
        } else {
          await new Promise(r => resolver = r);
        }
      }
    }
    
    return generator();
  });
}

async function handleRealTimeEvents(eventSource) {
  for await (const event of createEventStream(eventSource)) {
    // Process each event as it arrives
    updateUI(event);
  }
}
```
