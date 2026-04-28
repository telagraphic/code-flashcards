How do you create a higher-order function that takes another function as an argument?
?

```javascript
// Higher-order function that takes a function as argument
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling function with arguments:`, args);
    const result = fn(...args);
    console.log(`Function returned:`, result);
    return result;
  };
}

// Regular function
function add(a, b) {
  return a + b;
}

// Wrap with logging
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs arguments and result

// Practical example: API call wrapper
function withErrorHandling(fn) {
  return async function(...args) {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Error:', error);
      showErrorMessage(error.message);
      throw error;
    }
  };
}

const safeFetch = withErrorHandling(fetch);
safeFetch('/api/data').then(data => console.log(data));
```
