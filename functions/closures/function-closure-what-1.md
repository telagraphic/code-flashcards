What is a closure, conceptually?
?

```javascript
// Closure: A function that "remembers" variables from where it was defined
// (its lexical environment), even when that outer scope has finished running.

// The key idea: the inner function holds a reference to the outer scope.

function makeGreeter(greeting) {
  // greeting lives in makeGreeter's scope
  
  return function(name) {
    // This function "closes over" greeting.
    // It remembers greeting even after makeGreeter has returned.
    return `${greeting}, ${name}!`;
  };
}

const sayHi = makeGreeter('Hi');
const sayBye = makeGreeter('Bye');

console.log(sayHi('Alice'));  // "Hi, Alice!"
console.log(sayBye('Alice')); // "Bye, Alice!"

// Each returned function remembers its own greeting (its own closure).
```
