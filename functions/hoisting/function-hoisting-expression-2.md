What's the difference between var and const/let for function expressions?
?

```javascript
// var: variable is hoisted but undefined
console.log(funcVar); // undefined (not a function yet)
// funcVar(); // TypeError: funcVar is not a function

var funcVar = function() {
  return 'Hello';
};

// After assignment
funcVar(); // "Hello"

// const/let: variable is hoisted but in "temporal dead zone"
// console.log(funcConst); // ReferenceError: Cannot access before initialization
// funcConst(); // ReferenceError

const funcConst = function() {
  return 'Hello';
};

// After assignment
funcConst(); // "Hello"

// Practical example: avoiding hoisting issues
// Good: define before use
const validateEmail = function(email) {
  return email.includes('@');
};

if (validateEmail(userInput)) {
  // Process valid email
}

// Bad: trying to use before definition
// if (validateEmail(userInput)) { // ReferenceError
//   const validateEmail = function(email) {
//     return email.includes('@');
//   };
// }
```
