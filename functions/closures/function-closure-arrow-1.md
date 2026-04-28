How do closures work with arrow functions?
?

```javascript
// Arrow functions create closures and preserve lexical 'this'

function createTimer() {
  let seconds = 0; // Outer scope variable
  
  // Arrow function - creates closure over seconds
  const tick = () => {
    seconds++; // Accesses seconds from outer scope
    return seconds;
  };
  
  return tick;
}

const timer = createTimer();
console.log(timer()); // 1
console.log(timer()); // 2

// Arrow functions preserve 'this' in closures
class Counter {
  constructor() {
    this.count = 0;
  }
  
  createIncrementer() {
    // Arrow function captures 'this' from createIncrementer's scope
    return () => {
      this.count++; // 'this' refers to Counter instance
      return this.count;
    };
  }
}

const counter = new Counter();
const increment = counter.createIncrementer();
console.log(increment()); // 1
console.log(increment()); // 2

// Practical: Data privacy with arrow functions
function createApiClient(apiKey) {
  const baseUrl = 'https://api.example.com';
  
  const request = (endpoint) => {
    // Closure over apiKey and baseUrl
    return fetch(`${baseUrl}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
  };
  
  return { request };
}

const client = createApiClient('secret-key');
client.request('/users'); // apiKey is private
```
