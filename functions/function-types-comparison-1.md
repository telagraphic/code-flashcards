What are the key differences between function declarations and expressions?
?

```javascript
// Function Declaration
// - Hoisted (can call before definition)
// - Named function
// - Function scope

console.log(declared()); // "Works!" - hoisted

function declared() {
  return 'Works!';
}

// Function Expression
// - NOT hoisted (must define before use)
// - Can be anonymous or named
// - Assigned to variable

// console.log(expressed()); // ReferenceError

const expressed = function() {
  return 'Must define first';
};

console.log(expressed()); // "Must define first"

// When to use each:
// Declaration: When you need hoisting or want named functions
// Expression: When you need conditional assignment or control flow

let processor;
if (useAdvanced) {
  processor = function() { /* advanced */ };
} else {
  processor = function() { /* simple */ };
}
```
