What is a closure and how does it work?
?

```javascript
// Closure: function has access to variables from outer (enclosing) scope
// even after outer function has returned

function outerFunction(x) {
  // Outer function's variable
  const outerVariable = x;
  
  // Inner function (closure)
  function innerFunction(y) {
    // Can access outerVariable even after outerFunction returns
    return outerVariable + y;
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
console.log(closure(5)); // 15 (accesses outerVariable = 10)

// Practical: Counter with closure
function createCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++; // Accesses count from outer scope
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate closure, separate count)
console.log(counter1()); // 3

// Each call to createCounter() creates new closure with new count variable
```
