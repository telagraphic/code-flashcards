How do you use default parameters with destructuring and computed values?
?

```javascript
// Default parameters with destructuring
function processUser({ name = 'Anonymous', age = 0, email = 'no-email@example.com' } = {}) {
  return {
    name,
    age,
    email
  };
}

console.log(processUser()); // All defaults
console.log(processUser({ name: 'Alice' })); // name: 'Alice', others default

// Default parameters can reference previous parameters
function createRectangle(width = 10, height = width) {
  return { width, height };
}

console.log(createRectangle()); // { width: 10, height: 10 }
console.log(createRectangle(20)); // { width: 20, height: 20 }
console.log(createRectangle(20, 30)); // { width: 20, height: 30 }

// Practical: Configuration with defaults
function createConfig({
  apiUrl = 'https://api.example.com',
  timeout = 5000,
  retries = 3,
  onError = (error) => console.error(error)
} = {}) {
  return {
    apiUrl,
    timeout,
    retries,
    onError
  };
}

// Default parameters with function calls
function getUserId(user = getDefaultUser()) {
  return user.id;
}

function getDefaultUser() {
  return { id: 0, name: 'Guest' };
}

// Default parameters with nullish coalescing
function processData(data = null) {
  const value = data ?? 'default';
  return value;
}

// Practical: Callback with default
function processItems(items, callback = (item) => item) {
  return items.map(callback);
}

const numbers = [1, 2, 3];
console.log(processItems(numbers)); // [1, 2, 3]
console.log(processItems(numbers, n => n * 2)); // [2, 4, 6]
```
