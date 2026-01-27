What are the differences between var, let, and const?
?

```javascript
// Comparison of var, let, and const

// 1. SCOPE
// var: function-scoped
function varExample() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible)
}

// let/const: block-scoped
function letExample() {
  if (true) {
    let y = 1;
    const z = 1;
  }
  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}

// 2. HOISTING
// var: hoisted and initialized with undefined
console.log(a); // undefined
var a = 1;

// let/const: hoisted but in TDZ (Temporal Dead Zone)
// console.log(b); // ReferenceError
let b = 1;

// 3. REASSIGNMENT
var c = 1;
c = 2; // OK

let d = 1;
d = 2; // OK

const e = 1;
// e = 2; // TypeError

// 4. REDECLARATION
var f = 1;
var f = 2; // OK (redeclared)

let g = 1;
// let g = 2; // SyntaxError (cannot redeclare)

const h = 1;
// const h = 2; // SyntaxError (cannot redeclare)

// Best practices:
// - Use const by default
// - Use let when you need to reassign
// - Avoid var (use let/const instead)
```
