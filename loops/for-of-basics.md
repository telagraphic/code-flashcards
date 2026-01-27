What is a for...of loop and how does it work?
?

```javascript
// for...of loop: Iterates over iterable objects (arrays, strings, etc.)
// Provides direct access to values (not indices)

// Basic for...of loop
const items = ['apple', 'banana', 'cherry'];
for (const item of items) {
  console.log(item); // 'apple', 'banana', 'cherry'
}

// Practical: Array iteration
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

for (const user of users) {
  console.log(`${user.name} is ${user.age} years old`);
}

// Practical: String iteration
const text = 'Hello';
for (const char of text) {
  console.log(char); // 'H', 'e', 'l', 'l', 'o'
}

// Practical: DOM NodeList iteration
const buttons = document.querySelectorAll('.btn');
for (const button of buttons) {
  button.addEventListener('click', () => {
    console.log('Button clicked');
  });
}

// Practical: Map iteration
const userMap = new Map([
  ['alice', { id: 1 }],
  ['bob', { id: 2 }]
]);

for (const [key, value] of userMap) {
  console.log(`${key}: ${value.id}`);
}

// Practical: Set iteration
const uniqueIds = new Set([1, 2, 3, 2, 1]);
for (const id of uniqueIds) {
  console.log(id); // 1, 2, 3 (unique values)
}

// Get index with entries()
for (const [index, value] of items.entries()) {
  console.log(`${index}: ${value}`);
}
```
