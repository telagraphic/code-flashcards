What is a callback function in JavaScript?
?

```javascript
// A callback is a function passed as an argument to another function
// The callback is executed at a specific time or condition

// Simple example
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback(); // Execute the callback
}

// Pass a function as callback
greet('Alice', function() {
  console.log('Greeting completed!');
});

// Output:
// Hello, Alice
// Greeting completed!

// Callbacks allow you to:
// 1. Execute code after another operation completes
// 2. Handle asynchronous operations
// 3. Customize behavior of functions
```
