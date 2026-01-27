How do you use callbacks in array methods like map, filter, and forEach?
?

```javascript
// Array methods use callbacks to transform or iterate over arrays

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 28, active: true }
];

// map: transform each element (callback returns new value)
const names = users.map(function(user) {
  return user.name;
});
// ['Alice', 'Bob', 'Charlie']

// filter: select elements (callback returns boolean)
const activeUsers = users.filter(function(user) {
  return user.active;
});

// forEach: execute callback for each element
users.forEach(function(user) {
  console.log(`${user.name} is ${user.age} years old`);
});

// Arrow function callbacks (modern syntax)
const ages = users.map(user => user.age);
const adults = users.filter(user => user.age >= 18);
```
