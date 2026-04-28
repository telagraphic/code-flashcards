How does hoisting work with function expressions?
?

```javascript
// Function expressions are NOT hoisted
// Only the variable declaration is hoisted, not the assignment

console.log(greet); // undefined (variable exists but not assigned)
// greet('Alice'); // TypeError: greet is not a function

const greet = function(name) {
  return `Hello, ${name}!`;
};

// After assignment, it works
console.log(greet('Bob')); // "Hello, Bob!"

// Practical example: conditional function assignment
let getUserRole;

if (userType === 'admin') {
  getUserRole = function() {
    return 'Administrator';
  };
} else {
  getUserRole = function() {
    return 'User';
  };
}

// Must be called after assignment
const role = getUserRole();
```
