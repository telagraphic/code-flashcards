What is the simplest way to create a Promise in JavaScript?
?

```javascript
// Basic Promise creation
const myPromise = new Promise(function(resolve, reject) {
  // Asynchronous operation
  setTimeout(function() {
    const success = true;
    
    if (success) {
      resolve('Operation completed!'); // Success case
    } else {
      reject('Operation failed!'); // Error case
    }
  }, 1000);
});

// Promise represents a value that will be available in the future
// It can be in one of three states: pending, fulfilled, or rejected
```
