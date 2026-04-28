How do you use apply() for array operations and method borrowing?
?

```javascript
// apply() for array operations and method borrowing

// Practical: Convert arguments object to array
function processArguments() {
  // Convert arguments (array-like) to real array
  const args = Array.prototype.slice.apply(arguments);
  return args.map(arg => arg * 2);
}

console.log(processArguments(1, 2, 3)); // [2, 4, 6]

// Practical: Array concatenation
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// Concatenate multiple arrays
const combined = [];
combined.push.apply(combined, arr1);
combined.push.apply(combined, arr2);
combined.push.apply(combined, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Practical: DOM NodeList operations
const nodeList = document.querySelectorAll('.item');
const items = Array.prototype.slice.apply(nodeList);

// Now can use array methods
items.forEach(item => {
  item.classList.add('processed');
});

const firstThree = items.slice(0, 3);

// Practical: Dynamic method invocation
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
}

const calc = new Calculator();
const operation = 'add';
const args = [5, 3];

// Dynamically call method with arguments array
const result = Calculator.prototype[operation].apply(calc, args);
console.log(result); // 8

// Practical: Function composition with apply
function compose(...functions) {
  return function(...args) {
    return functions.reduceRight((result, fn) => {
      return Array.isArray(result) 
        ? fn.apply(null, result)
        : fn(result);
    }, args);
  };
}

const add = (a, b) => a + b;
const multiply = (n) => n * 2;
const composed = compose(multiply, add);
console.log(composed(3, 4)); // 14 (3+4=7, 7*2=14)
```
