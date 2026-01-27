What is undefined in JavaScript and how is it used?
?

```javascript
// undefined: Primitive value representing absence of value
// Automatically assigned to variables that are declared but not initialized

let x;
console.log(x); // undefined

// undefined is a type and a value
console.log(typeof undefined); // 'undefined'
console.log(undefined === undefined); // true

// When undefined occurs:
// 1. Variable declared but not assigned
let name;
console.log(name); // undefined

// 2. Function parameter not provided
function greet(name) {
  console.log(name); // undefined if not passed
}
greet();

// 3. Object property doesn't exist
const obj = {};
console.log(obj.nonExistent); // undefined

// 4. Array element doesn't exist
const arr = [1, 2];
console.log(arr[5]); // undefined

// 5. Function with no return statement
function noReturn() {
  // no return
}
console.log(noReturn()); // undefined

// Practical: Default parameter values
function createUser(name = 'Guest', email = undefined) {
  return {
    name,
    email: email ?? 'no-email@example.com'
  };
}

// Practical: Check for undefined
function processData(data) {
  if (data === undefined) {
    return 'No data provided';
  }
  return process(data);
}

// Practical: Optional chaining
const user = getUser();
const email = user?.email; // undefined if user is null/undefined

// Practical: Nullish coalescing
const value = someValue ?? 'default'; // Uses default if undefined or null

// Practical: Destructuring with defaults
const { name = 'Anonymous', age = 0 } = userData || {};

// undefined vs null:
// - undefined: Variable exists but has no value assigned
// - null: Explicitly assigned "no value" or "empty"
```
