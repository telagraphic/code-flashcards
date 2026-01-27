How do you create a curried function for configuration builders?
?

```javascript
// Curried function for building configurations
const createRequest = method => url => data => ({
  method,
  url,
  body: data,
  headers: { 'Content-Type': 'application/json' }
});

// Create specific request builders
const getRequest = createRequest('GET');
const postRequest = createRequest('POST');
const putRequest = createRequest('PUT');

// Use the builders
const getUserRequest = getRequest('/api/users');
const createUserRequest = postRequest('/api/users');

// Make requests
const user1 = getUserRequest('/123');
const newUser = createUserRequest({ name: 'Alice', email: 'alice@example.com' });

console.log(user1); // { method: 'GET', url: '/api/users/123', ... }
console.log(newUser); // { method: 'POST', url: '/api/users', body: {...}, ... }
```
