How do you use for await...of to iterate over async data streams?
?

```javascript
// for await...of iterates over async iterables (Promises, async generators)
async function processStreamingData() {
  // Simulate streaming API responses
  const responses = [
    fetch('/api/chunk1'),
    fetch('/api/chunk2'),
    fetch('/api/chunk3')
  ];
  
  // Process each response as it completes
  for await (const response of responses) {
    const data = await response.json();
    console.log('Received chunk:', data);
    appendToUI(data);
  }
  
  console.log('All chunks processed');
}

// Practical: Process WebSocket messages
async function handleWebSocketMessages(socket) {
  for await (const message of socket.messages) {
    // Process each message as it arrives
    const data = JSON.parse(message);
    updateUI(data);
  }
}

// for await...of waits for each Promise to resolve
// Processes items sequentially, one at a time
```
