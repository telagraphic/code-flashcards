What is an anonymous function and when should you use it?
?

```javascript
// Anonymous function - no name, used inline
// Can be function expression or arrow function

// Use cases:
// 1. Callbacks that are only used once
setTimeout(function() {
  console.log('Delayed message');
}, 1000);

// Arrow function version (also anonymous)
setTimeout(() => {
  console.log('Delayed message');
}, 1000);

// 2. Event handlers
document.addEventListener('click', function(event) {
  console.log('Clicked:', event.target);
});

// 3. Array methods
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(function(n) {
  return n * n;
});

// 4. Immediately invoked (IIFE)
(function() {
  const privateVar = 'hidden';
  console.log(privateVar);
})();

// 5. When function name isn't needed for debugging
const result = numbers.filter(function(item) {
  return item > 2;
});
```
