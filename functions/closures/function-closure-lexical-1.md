What is lexical scoping and how does it work with closures?
?

```javascript
// Lexical scoping: variables are accessible based on where they're defined
// Closure: function retains access to variables from outer scope

// Example: Function declaration with closure
function outerFunction(x) {
  const outerVar = x; // Lexically scoped to outerFunction
  
  // Inner function has access to outerVar (closure)
  function innerFunction(y) {
    return outerVar + y; // Accesses outerVar from outer scope
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
console.log(closure(5)); // 15 (accesses outerVar = 10)

// Lexical scope chain: innerFunction -> outerFunction -> global
function createMultiplier(factor) {
  // factor is in outer scope
  function multiply(number) {
    // multiply can access factor (closure)
    return number * factor;
  }
  return multiply;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Each closure maintains its own reference to outer variables
```
