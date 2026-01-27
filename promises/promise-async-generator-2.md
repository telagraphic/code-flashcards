How do you use async generators for real-time data streaming?
?

```javascript
// Async generator for real-time event streaming
async function* streamEvents(eventSource) {
  const eventQueue = [];
  let resolveNext = null;
  
  // Listen for events
  eventSource.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    if (resolveNext) {
      resolveNext({ value: data, done: false });
      resolveNext = null;
    } else {
      eventQueue.push(data);
    }
  });
  
  // Yield events as they arrive
  while (true) {
    if (eventQueue.length > 0) {
      yield eventQueue.shift();
    } else {
      await new Promise(function(resolve) {
        resolveNext = resolve;
      });
    }
  }
}

// Usage: Process real-time updates
async function handleRealTimeUpdates() {
  const eventSource = new EventSource('/api/events');
  
  for await (const event of streamEvents(eventSource)) {
    // Process each event as it arrives
    updateDashboard(event);
  }
}

// Practical: WebSocket message stream
async function* websocketMessages(ws) {
  while (ws.readyState === WebSocket.OPEN) {
    yield new Promise(function(resolve) {
      ws.onmessage = function(event) {
        resolve(JSON.parse(event.data));
      };
    });
  }
}
```
