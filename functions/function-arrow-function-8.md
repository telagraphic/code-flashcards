How do you handle arrow functions with destructuring and default parameters?
?

```javascript
// Destructuring single object parameter
const getName = ({ first, last }) => `${first} ${last}`;
const user = { first: 'John', last: 'Doe' };
console.log(getName(user)); // "John Doe"

// Destructuring with default values
const greet = ({ name = 'Guest', age = 0 }) => {
  return `Hello, ${name}! You are ${age} years old.`;
};

// Destructuring array parameter
const getFirst = ([first]) => first;
const numbers = [1, 2, 3];
console.log(getFirst(numbers)); // 1

// Multiple destructured parameters
const createUser = ({ name, email }, { role = 'user' }) => {
  return { name, email, role };
};

// Nested destructuring
const getStreet = ({ address: { street } }) => street;
const person = { address: { street: '123 Main St' } };
console.log(getStreet(person)); // "123 Main St"

// Rest with destructuring
const processUser = ({ name, ...rest }) => {
  console.log(name);
  return rest;
};

// Practical examples:
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false }
];

// Destructure in map
const names = users.map(({ name }) => name);
const activeUsers = users.filter(({ active }) => active);

// Destructure with defaults
const formatUser = ({ name = 'Anonymous', age = 0 }) => {
  return `${name} (${age})`;
};
```
