How do you use closures for function factories and partial application?
?

```javascript
// Closure for function factories
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Practical: API endpoint factory
function createApiEndpoint(baseURL) {
  return function(endpoint) {
    return `${baseURL}${endpoint}`;
  };
}

const apiEndpoint = createApiEndpoint('https://api.example.com');
const usersEndpoint = apiEndpoint('/users');
const postsEndpoint = apiEndpoint('/posts');

console.log(usersEndpoint); // 'https://api.example.com/users'

// Partial application with closure
function add(a, b, c) {
  return a + b + c;
}

function partialAdd(a) {
  return function(b, c) {
    return add(a, b, c);
  };
}

const add10 = partialAdd(10);
console.log(add10(5, 3)); // 18

// Practical: Event handler factory
function createEventHandler(action, data) {
  return function(event) {
    event.preventDefault();
    action(data);
  };
}

const handleSubmit = createEventHandler(submitForm, { formId: 'login' });
document.getElementById('submitBtn').addEventListener('click', handleSubmit);
```
