How do arrow functions work with async/await and generators?
?

```javascript
// Async arrow function - one-liner
const fetchData = async (url) => await fetch(url);

// Async arrow function - with braces
const fetchAndParse = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Async arrow function in array methods
const urls = ['/api/users', '/api/posts'];
const data = await Promise.all(
  urls.map(async url => {
    const response = await fetch(url);
    return response.json();
  })
);

// Async arrow function with error handling
const safeFetch = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return null;
  }
};

// Arrow functions CANNOT be generators
// const gen = *() => {}; // SyntaxError - not allowed
// CORRECT: Use regular function for generators
function* generator() {
  yield 1;
  yield 2;
}

// Async generator - must use regular function
async function* asyncGenerator() {
  yield await fetch('/api/data');
}

// Practical example: async arrow in promise chain
const processUser = async (userId) => {
  const user = await fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => data.user)
    .catch(error => ({ error: error.message }));
  
  return user;
};
```
