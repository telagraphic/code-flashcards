How do you destructure arrays with rest operator and nested arrays?
?

```javascript
// Rest operator in array destructuring
const numbers = [1, 2, 3, 4, 5];

// Extract first elements, collect rest
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Nested array destructuring
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const [[a, b, c], [d, e, f]] = matrix;
console.log(a, b, c); // 1 2 3
console.log(d, e, f); // 4 5 6

// Practical: Extract first and last elements
const items = ['apple', 'banana', 'cherry', 'date'];
const [firstItem, ...middle, lastItem] = items;
// Note: This doesn't work as expected - rest must be last

// Correct way:
const [firstItem2, ...restItems] = items;
const lastItem2 = restItems.pop();
console.log(firstItem2); // 'apple'
console.log(lastItem2); // 'date'

// Practical: Parse string into parts
const dateString = '2024-01-15';
const [year, month, day] = dateString.split('-');
console.log(year, month, day); // '2024' '01' '15'
```
