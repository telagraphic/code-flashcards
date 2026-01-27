How do you use default parameters in functions?
?

```javascript
// Default parameter values
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log(greet()); // 'Hello, Guest!'
console.log(greet('Alice')); // 'Hello, Alice!'

// Multiple default parameters
function createUser(name = 'Anonymous', age = 0, role = 'user') {
  return { name, age, role };
}

console.log(createUser()); // { name: 'Anonymous', age: 0, role: 'user' }
console.log(createUser('Alice', 30)); // { name: 'Alice', age: 30, role: 'user' }

// Default parameters with expressions
function getTimestamp(date = new Date()) {
  return date.getTime();
}

console.log(getTimestamp()); // Current timestamp
console.log(getTimestamp(new Date('2024-01-01'))); // Specific date

// Practical: API calls with defaults
async function fetchData(url, options = {}) {
  const defaults = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000
  };
  
  const config = { ...defaults, ...options };
  return fetch(url, config);
}

// Default parameters evaluated at call time
function appendItem(list = []) {
  list.push('new item');
  return list;
}

const result1 = appendItem(); // ['new item']
const result2 = appendItem(); // ['new item'] (new array each time)
```
