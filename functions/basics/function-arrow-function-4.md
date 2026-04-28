When do arrow function parameters need parentheses?
?

```javascript
// Single parameter - parentheses optional
const square = x => x * 2;
const greet = name => `Hello, ${name}!`;

// Multiple parameters - parentheses REQUIRED
const add = (a, b) => a + b;
const fullName = (first, last) => `${first} ${last}`;

// Zero parameters - parentheses REQUIRED
const getTime = () => new Date().getTime();
const random = () => Math.random();

// Destructured parameters - parentheses REQUIRED
const getName = ({ first, last }) => `${first} ${last}`;
const getFirst = ([first]) => first;

// Default parameters - parentheses REQUIRED
const greet = (name = 'Guest') => `Hello, ${name}!`;
const multiply = (a, b = 1) => a * b;

// Rest parameters - parentheses REQUIRED
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
const logAll = (...args) => console.log(args);

// Practical examples:
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

// Single param - no parentheses
const names = users.map(user => user.name);

// Destructuring - parentheses needed
const ages = users.map(({ age }) => age);

// Multiple params - parentheses needed
const formatted = users.map((user, index) => `${index + 1}. ${user.name}`);
```
