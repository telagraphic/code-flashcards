How does let work with block scope and temporal dead zone?
?

```javascript
// let is block-scoped (confined to {} blocks)
// let is not hoisted in the same way as var

// Block scope
if (true) {
  let x = 5;
  console.log(x); // 5
}
// console.log(x); // ReferenceError: x is not defined

// Temporal Dead Zone (TDZ)
// Cannot access let variable before declaration
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Practical: Loop variable with let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2 (each iteration has its own i)
  }, 100);
}

// Each iteration creates new binding
for (let i = 0; i < 3; i++) {
  // New 'i' created for each iteration
  console.log(i);
}

// Block scope in functions
function example() {
  if (true) {
    let blockScoped = 'inside block';
    console.log(blockScoped); // 'inside block'
  }
  // console.log(blockScoped); // ReferenceError
}

// Practical: Switch statement with let
switch (value) {
  case 1: {
    let result = 'one';
    console.log(result);
    break;
  }
  case 2: {
    let result = 'two'; // Different variable, no conflict
    console.log(result);
    break;
  }
}
```
