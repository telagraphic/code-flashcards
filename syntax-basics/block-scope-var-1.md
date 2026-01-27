How does var work with function scope and hoisting?
?

```javascript
// var is function-scoped, not block-scoped
// var declarations are hoisted to top of function

function example() {
  console.log(x); // undefined (hoisted but not initialized)
  var x = 5;
  console.log(x); // 5
}

// var ignores block scope
if (true) {
  var y = 10;
}
console.log(y); // 10 (accessible outside block!)

// Practical: Loop variable issue
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3 (all closures share same i)
  }, 100);
}

// Fix: Use IIFE to create new scope
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2
    }, 100);
  })(i);
}

// var hoisting example
function hoistingExample() {
  console.log(hoisted); // undefined
  var hoisted = 'I am hoisted';
  console.log(hoisted); // 'I am hoisted'
}

// Equivalent to:
function hoistingExampleEquivalent() {
  var hoisted; // Declaration hoisted
  console.log(hoisted); // undefined
  hoisted = 'I am hoisted'; // Assignment stays
  console.log(hoisted); // 'I am hoisted'
}
```
