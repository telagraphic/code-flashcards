How do named function expressions differ from anonymous ones in hoisting?
?

```javascript
// Named function expression - name is only available inside the function
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Can use 'fact' inside
};

console.log(factorial(5)); // 120
// console.log(fact(5)); // ReferenceError: fact is not defined

// Anonymous function expression
const multiply = function(a, b) {
  return a * b;
};

// Practical example: recursive named function expression
const flatten = function flattenArray(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // Recursive call
    } else {
      result.push(item);
    }
  }
  return result;
};

console.log(flatten([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]

// Neither type is hoisted - must be defined before use
// flatten([1, 2]); // ReferenceError if called before assignment
```
