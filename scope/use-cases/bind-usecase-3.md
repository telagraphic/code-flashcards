How do you use bind() for method binding and callback preservation?
?

```javascript
// bind() preserves method context in callbacks

// Practical: Array methods with object context
class Counter {
  constructor() {
    this.count = 0;
    this.items = [1, 2, 3, 4, 5];
  }
  
  increment(value) {
    this.count += value;
    return this.count;
  }
  
  processItems() {
    // 'this' would be lost in forEach callback
    // Solution: bind 'this'
    this.items.forEach(this.increment.bind(this));
  }
}

const counter = new Counter();
counter.processItems();
console.log(counter.count); // 15 (sum of items)

// Practical: Promise callbacks with context
class DataLoader {
  constructor() {
    this.cache = new Map();
  }
  
  async load(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const data = await fetch(`/api/data/${key}`).then(r => r.json());
    this.cache.set(key, data);
    return data;
  }
  
  async loadMultiple(keys) {
    // Bind 'this' for each promise
    const promises = keys.map(this.load.bind(this));
    return Promise.all(promises);
  }
}

const loader = new DataLoader();
loader.loadMultiple(['user1', 'user2', 'user3']);

// Practical: Debounce/throttle with context
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

class SearchComponent {
  constructor() {
    this.query = '';
  }
  
  performSearch(query) {
    this.query = query;
    console.log(`Searching for: ${query}`);
  }
  
  setup() {
    const input = document.getElementById('search');
    // Bind 'this' for debounced method
    const debouncedSearch = debounce(this.performSearch.bind(this), 300);
    input.addEventListener('input', (e) => debouncedSearch(e.target.value));
  }
}

// Practical: Method extraction with binding
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const user = new User('Alice');
const greet = user.greet.bind(user); // Extract and bind

// Can call without 'user' object
setTimeout(greet, 1000); // 'Hello, I'm Alice'
```
