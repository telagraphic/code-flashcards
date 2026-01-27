How do you use clear() to remove all entries from a Map?
?

```javascript
// clear() removes all key-value pairs from Map
const tempData = new Map([
  ['item1', 'value1'],
  ['item2', 'value2'],
  ['item3', 'value3']
]);

console.log(tempData.size); // 3

// Clear all entries
tempData.clear();
console.log(tempData.size); // 0

// Practical: Reset application state
class AppState {
  constructor() {
    this.data = new Map();
  }
  
  setState(key, value) {
    this.data.set(key, value);
  }
  
  reset() {
    this.data.clear();
    console.log('Application state reset');
  }
}

// Practical: Clear cache on logout
const userCache = new Map();
const sessionCache = new Map();

function logout() {
  // Clear all cached data
  userCache.clear();
  sessionCache.clear();
  console.log('All caches cleared');
}
```
