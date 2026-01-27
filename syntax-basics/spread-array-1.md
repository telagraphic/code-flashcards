How do you use the spread operator (...) with arrays?
?

```javascript
// Spread operator expands array into individual elements

// Copy array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Add elements
const newArray = [0, ...arr1, 4];
console.log(newArray); // [0, 1, 2, 3, 4]

// Practical: Merge arrays without mutation
function addItem(array, item) {
  return [...array, item];
}

const items = [1, 2, 3];
const newItems = addItem(items, 4);
console.log(items); // [1, 2, 3] (unchanged)
console.log(newItems); // [1, 2, 3, 4]

// Practical: Function arguments
function sum(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Practical: Clone and modify
const users = ['Alice', 'Bob'];
const updatedUsers = [...users, 'Charlie'];
console.log(updatedUsers); // ['Alice', 'Bob', 'Charlie']
```
