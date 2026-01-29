What happens when you call a function declaration before it's defined?
?

```javascript
// Function declarations are fully hoisted
// The entire function is available throughout the scope

// Called before definition - works perfectly
const result = calculateTotal(10, 20);
console.log(result); // 30

function calculateTotal(a, b) {
  return a + b;
}

// Practical example: recursive function
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1); // Can call itself - already hoisted
}

console.log(factorial(5)); // 120

// Even works in nested scopes
function outer() {
  inner(); // Works - inner is hoisted
  
  function inner() {
    console.log('Called from outer');
  }
}

outer(); // "Called from outer"
```
