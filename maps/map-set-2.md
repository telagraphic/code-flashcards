How do you use set() for caching computed values and memoization?
?

```javascript
// set() useful for caching expensive computations
const computationCache = new Map();

function expensiveCalculation(input) {
  // Check cache first
  if (computationCache.has(input)) {
    return computationCache.get(input);
  }
  
  // Perform expensive operation
  const result = input * input * input; // Example computation
  
  // Cache result
  computationCache.set(input, result);
  return result;
}

// Practical: Memoize API responses
const apiResponseCache = new Map();

async function fetchWithCache(url) {
  if (apiResponseCache.has(url)) {
    console.log('Returning cached response');
    return apiResponseCache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  // Cache the response
  apiResponseCache.set(url, data);
  
  return data;
}

// Practical: Component state management
class ComponentState {
  constructor() {
    this.state = new Map();
  }
  
  setState(key, value) {
    this.state.set(key, value);
    this.notifyListeners(key, value);
  }
  
  getState(key) {
    return this.state.get(key);
  }
}
```
