How do you use a callback function with the map method to transform an array?
?

```javascript
// Callback function for array transformation
const numbers = [1, 2, 3, 4, 5];

// Callback function passed to map
const doubled = numbers.map(function(num) {
  return num * 2;
});

// Or with arrow function callback
const tripled = numbers.map(num => num * 3);

// Practical web app example: transform user data
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

const userNames = users.map(function(user) {
  return user.name;
});

console.log(userNames); // ['Alice', 'Bob']
```
