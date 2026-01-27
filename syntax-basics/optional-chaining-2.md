How do you use optional chaining with function calls and methods?
?

```javascript
// Optional chaining with function calls
const obj = {
  method: function() {
    return 'result';
  }
};

// Safe method call
console.log(obj?.method?.()); // 'result'

// If method doesn't exist, returns undefined
const obj2 = {};
console.log(obj2?.method?.()); // undefined (no error)

// Practical: Callback functions
function processData(data, callback) {
  // Safely call callback if provided
  callback?.();
  
  return data;
}

processData({ id: 1 }, () => console.log('Callback called'));
processData({ id: 1 }); // No error if callback not provided

// Optional chaining with array methods
const users = [
  { name: 'Alice', getEmail: () => 'alice@example.com' }
];

console.log(users?.[0]?.getEmail?.()); // 'alice@example.com'

// Practical: DOM manipulation
const element = document.querySelector('.user-name');
const text = element?.textContent ?? 'No name';
console.log(text);

// Practical: API methods
const api = {
  users: {
    get: async (id) => ({ id, name: 'Alice' })
  }
};

const user = await api?.users?.get?.(123);
console.log(user); // { id: 123, name: 'Alice' }

// Optional chaining with computed properties
const key = 'name';
const value = user?.[key];
console.log(value); // 'Alice'

// Practical: Safe navigation through complex objects
const config = {
  api: {
    endpoints: {
      users: '/api/users'
    }
  }
};

const endpoint = config?.api?.endpoints?.users ?? '/api/default';
console.log(endpoint); // '/api/users'
```
