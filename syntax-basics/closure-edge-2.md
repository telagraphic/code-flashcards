How do closures work with async operations and promises?
?

```javascript
// Closure with async operations
function createAsyncCounter() {
  let count = 0;
  
  return {
    increment: async function() {
      await new Promise(resolve => setTimeout(resolve, 100));
      count++; // Closure maintains count across async operations
      return count;
    },
    
    getCount: function() {
      return count;
    }
  };
}

const counter = createAsyncCounter();
counter.increment().then(count => console.log(count)); // 1
counter.increment().then(count => console.log(count)); // 2

// Closure with Promise chains
function createDataLoader() {
  const cache = new Map();
  
  return async function(key) {
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const data = await fetch(`/api/data/${key}`).then(r => r.json());
    cache.set(key, data); // Closure maintains cache
    return data;
  };
}

const loadData = createDataLoader();
loadData('user123').then(data => console.log(data));
loadData('user123').then(data => console.log(data)); // From cache

// Closure with multiple async operations
function createRequestQueue() {
  const queue = [];
  let processing = false;
  
  async function processQueue() {
    if (processing || queue.length === 0) return;
    
    processing = true;
    while (queue.length > 0) {
      const request = queue.shift();
      await request();
    }
    processing = false;
  }
  
  return {
    add: function(request) {
      queue.push(request);
      processQueue();
    },
    
    getQueueLength: function() {
      return queue.length;
    }
  };
}

const requestQueue = createRequestQueue();
requestQueue.add(async () => {
  await fetch('/api/1');
  console.log('Request 1 complete');
});
requestQueue.add(async () => {
  await fetch('/api/2');
  console.log('Request 2 complete');
});
```
