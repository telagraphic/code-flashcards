How does hoisting work with arrow functions?
?

```javascript
// Arrow functions are NOT hoisted
// They behave like function expressions

// console.log(greet); // ReferenceError (const in temporal dead zone)
// greet('Alice'); // ReferenceError

const greet = (name) => {
  return `Hello, ${name}!`;
};

// After assignment, works normally
console.log(greet('Bob')); // "Hello, Bob!"

// Practical example: arrow functions in array methods
const numbers = [1, 2, 3, 4, 5];

// Must define arrow function before using it
const double = (n) => n * 2;
const doubled = numbers.map(double);
console.log(doubled); // [2, 4, 6, 8, 10]

// Or define inline (no hoisting needed)
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```
