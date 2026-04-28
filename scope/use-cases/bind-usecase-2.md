How do you use bind() for partial application and currying?
?

```javascript
// bind() can pre-fill arguments (partial application)

// Basic partial application
function multiply(a, b) {
  return a * b;
}

// Bind first argument
const double = multiply.bind(null, 2);
console.log(double(5)); // 10

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15

// Practical: API endpoint builder
function createRequest(method, url, data) {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Create specialized functions
const getRequest = createRequest.bind(null, 'GET');
const postRequest = createRequest.bind(null, 'POST');
const putRequest = createRequest.bind(null, 'PUT');

// Usage
getRequest('/api/users');
postRequest('/api/users', { name: 'Alice' });

// Practical: Event handler factory
function createEventHandler(action, data) {
  return function(event) {
    event.preventDefault();
    action(data);
  };
}

const handleSubmit = createEventHandler.bind(null, submitForm, { formId: 'login' });
document.getElementById('submitBtn').addEventListener('click', handleSubmit);

// Practical: Configuration builder
function createConfig(baseURL, timeout, retries) {
  return {
    baseURL,
    timeout,
    retries
  };
}

// Pre-configure with baseURL
const apiConfig = createConfig.bind(null, 'https://api.example.com');
const config1 = apiConfig(5000, 3);
const config2 = apiConfig(10000, 5);

// Practical: Curried function
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Using bind for currying
function addBind(a, b, c) {
  return a + b + c;
}

const add10 = addBind.bind(null, 10);
const add10And5 = add10.bind(null, 5);
console.log(add10And5(3)); // 18
```
