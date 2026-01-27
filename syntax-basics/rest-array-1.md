How do you use the rest parameter (...) to collect remaining array elements?
?

```javascript
// Rest parameter collects remaining elements into array

// In function parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(5, 10)); // 15

// With other parameters
function greet(greeting, ...names) {
  return names.map(name => `${greeting}, ${name}!`).join(' ');
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie'));
// 'Hello, Alice! Hello, Bob! Hello, Charlie!'

// Practical: Flexible API functions
function createUser(name, email, ...roles) {
  return {
    name,
    email,
    roles: roles.length > 0 ? roles : ['user']
  };
}

console.log(createUser('Alice', 'alice@example.com', 'admin', 'editor'));
// { name: 'Alice', email: '...', roles: ['admin', 'editor'] }

// In array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Practical: Process variable arguments
function logMessages(...messages) {
  messages.forEach((msg, index) => {
    console.log(`[${index + 1}] ${msg}`);
  });
}

logMessages('Error occurred', 'Retrying...', 'Success');
```
