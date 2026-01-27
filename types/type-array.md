What is the Array type in JavaScript and how is it used?
?

```javascript
// Array: Ordered collection of elements
// Special type of object with numeric indices

// Array creation
const arr1 = []; // Array literal
const arr2 = new Array(5); // Array with length 5
const arr3 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array methods
const numbers = [1, 2, 3, 4, 5];

// Transformation
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// Iteration
numbers.forEach(n => console.log(n));
for (const num of numbers) {
  console.log(num);
}

// Practical: Data processing
const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 }
];

const userNames = users.map(user => user.name);
const adults = users.filter(user => user.age >= 18);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

// Practical: Form data handling
const formData = new FormData(form);
const entries = Array.from(formData.entries());
const data = Object.fromEntries(entries);

// Practical: API response arrays
async function fetchUsers() {
  const response = await fetch('/api/users');
  const users = await response.json(); // Array of user objects
  return users.map(user => ({
    ...user,
    displayName: `${user.firstName} ${user.lastName}`
  }));
}

// Practical: Array manipulation
const items = [1, 2, 3];
items.push(4); // [1, 2, 3, 4]
items.pop(); // [1, 2, 3]
items.unshift(0); // [0, 1, 2, 3]
items.shift(); // [1, 2, 3]

// Practical: Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [3, 4, 5]

// Practical: Spread operator
const combined = [...arr1, ...arr2];
const copied = [...original];

// Array is object type
console.log(typeof []); // 'object'
console.log(Array.isArray([])); // true (use this to check)
```
