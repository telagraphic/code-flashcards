What is the browser Event Loop and how does it work?
?

```javascript
// Event Loop: Browser's mechanism for handling async operations
// Ensures JavaScript doesn't block rendering

// Event Loop phases:
// 1. Call Stack: Execute synchronous code
// 2. Microtask Queue: Promises, queueMicrotask
// 3. Macrotask Queue: setTimeout, setInterval, events
// 4. Render: Paint and Composite (every ~16ms for 60fps)

// Execution order:
function example() {
  console.log('1'); // Call stack
  
  setTimeout(() => console.log('2'), 0); // Macrotask
  
  Promise.resolve().then(() => console.log('3')); // Microtask
  
  console.log('4'); // Call stack
}

example();
// Output: 1, 4, 3, 2
// Call stack → Microtasks → Macrotasks → Render

// Practical: Long-running tasks block rendering
function blockingTask() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // Blocks for 1 second
  }
}

// Blocks rendering - page freezes
blockingTask();

// Practical: Break up long tasks
function nonBlockingTask() {
  const chunkSize = 100;
  let processed = 0;
  
  function processChunk() {
    for (let i = 0; i < chunkSize; i++) {
      // Process item
      processed++;
    }
    
    if (processed < totalItems) {
      // Yield to event loop
      setTimeout(processChunk, 0);
    }
  }
  
  processChunk();
}

// Event Loop ensures:
// - UI remains responsive
// - Tasks execute in correct order
// - Rendering happens regularly
```
