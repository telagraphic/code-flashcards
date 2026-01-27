How do you create an arrow function for array transformation?
?

```javascript
// Arrow function for array transformation
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Calculate sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Practical example: transform user data
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

const userNames = users.map(user => user.name);
const adults = users.filter(user => user.age >= 18);
```
