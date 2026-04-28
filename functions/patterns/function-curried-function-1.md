How do you create a curried function for partial application?
?

```javascript
// Curried function - returns function for each argument
const add = a => b => a + b;

// Partial application
const add5 = add(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15

// Can also call directly
console.log(add(5)(3)); // 8

// Practical example: API endpoint builder
const createEndpoint = baseURL => endpoint => `${baseURL}${endpoint}`;

const apiEndpoint = createEndpoint('https://api.example.com');
const usersEndpoint = apiEndpoint('/users');
const postsEndpoint = apiEndpoint('/posts');

console.log(usersEndpoint); // 'https://api.example.com/users'
console.log(postsEndpoint); // 'https://api.example.com/posts'
```
