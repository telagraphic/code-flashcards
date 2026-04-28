How do you use apply() to pass arrays as function arguments?
?

```javascript
// apply() is perfect when you have an array of arguments

// Math.max with array of numbers
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // 7

// Without apply, you'd need spread operator
const max2 = Math.max(...numbers); // Modern alternative

// Practical: Function that accepts variable arguments
function sum() {
  return Array.from(arguments).reduce((total, num) => total + num, 0);
}

const numbersArray = [1, 2, 3, 4, 5];
const total = sum.apply(null, numbersArray);
console.log(total); // 15

// Practical: Merging arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [7, 8, 9];

// Using apply to push multiple items
array1.push.apply(array1, array2);
console.log(array1); // [1, 2, 3, 4, 5, 6]

// Practical: Finding min/max in array
function findMinMax(arr) {
  return {
    min: Math.min.apply(null, arr),
    max: Math.max.apply(null, arr)
  };
}

const stats = findMinMax([10, 5, 8, 2, 9]);
console.log(stats); // { min: 2, max: 10 }

// Practical: Dynamic function calls with variable arguments
function createUser(name, email, role, age) {
  return {
    name,
    email,
    role,
    age
  };
}

const userData = ['Alice', 'alice@example.com', 'admin', 30];
const user = createUser.apply(null, userData);
console.log(user); // { name: 'Alice', email: '...', role: 'admin', age: 30 }
```
