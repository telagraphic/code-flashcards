What is async for...of (for await...of) and how does it work?
?

```javascript
// for await...of: Iterates over async iterables
// Waits for each promise to resolve before continuing

// Basic async iteration
async function processAsyncData() {
  const promises = [
    fetch('/api/data1').then(r => r.json()),
    fetch('/api/data2').then(r => r.json()),
    fetch('/api/data3').then(r => r.json())
  ];
  
  for await (const data of promises) {
    console.log(data);
    // Processes each response as it resolves
  }
}

// Practical: Process async generator
async function* fetchPages() {
  let page = 1;
  while (true) {
    const response = await fetch(`/api/items?page=${page}`);
    const data = await response.json();
    
    if (data.items.length === 0) break;
    
    yield data.items;
    page++;
  }
}

async function processAllPages() {
  for await (const items of fetchPages()) {
    // Process each page of items
    items.forEach(item => console.log(item));
  }
}

// Practical: Stream processing
async function processStream(stream) {
  for await (const chunk of stream) {
    // Process each chunk as it arrives
    processChunk(chunk);
  }
}

// Practical: WebSocket messages
async function handleMessages(websocket) {
  for await (const message of websocket.messages) {
    // Handle each message as it arrives
    handleMessage(message);
  }
}

// Practical: File reading
async function readFileChunks(file) {
  const reader = file.stream().getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Process chunk
      processChunk(value);
    }
  } finally {
    reader.releaseLock();
  }
}
```
