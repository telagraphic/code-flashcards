How does const work with block scope and immutability?
?

```javascript
// const is block-scoped like let
// const must be initialized when declared
// const prevents reassignment, but object properties can change

// Basic const usage
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable

// const with objects
const user = {
  name: 'Alice',
  age: 30
};

user.age = 31; // OK - object properties can change
user.email = 'alice@example.com'; // OK - can add properties
// user = {}; // TypeError - cannot reassign

// const with arrays
const numbers = [1, 2, 3];
numbers.push(4); // OK - array methods work
numbers[0] = 10; // OK - can modify elements
// numbers = []; // TypeError - cannot reassign

// Block scope
if (true) {
  const blockConst = 'inside block';
  console.log(blockConst); // 'inside block'
}
// console.log(blockConst); // ReferenceError

// Practical: Freeze object for true immutability
const immutableUser = Object.freeze({
  name: 'Alice',
  age: 30
});

// immutableUser.age = 31; // Silent failure in non-strict mode
// Object.freeze() prevents property changes

// Practical: const in loops
const items = ['a', 'b', 'c'];
for (const item of items) {
  console.log(item); // 'a', 'b', 'c'
  // item = 'x'; // TypeError - cannot reassign
}

// const with destructuring
const { name, age } = { name: 'Bob', age: 25 };
console.log(name, age); // 'Bob' 25
```
