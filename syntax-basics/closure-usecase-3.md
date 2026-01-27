How do you use closures for memoization and caching?
?

```javascript
// Closure for memoization (caching function results)
function memoize(fn) {
  const cache = {}; // Private cache
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Cache hit!');
      return cache[key];
    }
    
    console.log('Computing...');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive computation
function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
}

const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(1000000)); // Computing...
console.log(memoizedCalc(1000000)); // Cache hit!

// Practical: API response caching
function createCachedFetch() {
  const cache = new Map();
  
  return async function(url) {
    if (cache.has(url)) {
      return cache.get(url);
    }
    
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    return data;
  };
}

const cachedFetch = createCachedFetch();
cachedFetch('/api/users'); // Fetches from API
cachedFetch('/api/users'); // Returns from cache
```
