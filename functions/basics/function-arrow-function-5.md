How do you write one-liner arrow functions with implicit return?
?

```javascript
// One-liner with implicit return - no braces, no return keyword
const double = x => x * 2;
const greet = name => `Hello, ${name}!`;
const isEven = n => n % 2 === 0;

// Multiple parameters
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// Object literal return - wrap in parentheses
const createUser = (name, age) => ({ name, age });
const getConfig = () => ({ apiKey: 'secret', timeout: 5000 });

// Array return - no parentheses needed
const getNumbers = () => [1, 2, 3, 4, 5];
const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

// Expression return
const square = x => x * x;
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// Practical examples:
const numbers = [1, 2, 3, 4, 5];

// One-liners in array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Returning objects
const users = ['Alice', 'Bob'].map(name => ({ name, id: Math.random() }));

// Conditional expression
const status = users.map(user => user.active ? 'online' : 'offline');
```
