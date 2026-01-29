When should you use anonymous vs named functions?
?

```javascript
// Anonymous Function
// - No name identifier
// - Harder to debug (shows as "anonymous" in stack traces)
// - Good for one-time use

const numbers = [1, 2, 3];
numbers.map(function(item) {
  return item * 2; // Stack trace: "anonymous"
});

// Named Function Expression
// - Has name identifier
// - Better for debugging (name appears in stack traces)
// - Name only available inside function

const doubled = numbers.map(function double(item) {
  return item * 2; // Stack trace: "double"
});

// Function Declaration
// - Named and hoisted
// - Best for debugging
// - Reusable

function multiplyByTwo(item) {
  return item * 2; // Stack trace: "multiplyByTwo"
}

// When to use each:
// Anonymous: Simple one-time callbacks, short functions
setTimeout(function() {
  console.log('Done');
}, 1000);


setTimeout(() => {
  console.log('done');
}, 1000)

// Named: Complex logic, need better debugging, recursive
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Can reference itself
};
```
