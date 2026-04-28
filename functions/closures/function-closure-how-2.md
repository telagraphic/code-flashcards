How is a closure implemented (function type doesn't matter)?
?

```javascript
// Closures are created by *where* the function is defined, not *how*.
// Declaration, expression, or arrow—all can form closures.

// Function declaration
function outerDecl() {
  const x = 1;
  function inner() {
    return x;
  }
  return inner;
}

// Function expression
function outerExpr() {
  const x = 1;
  const inner = function() {
    return x;
  };
  return inner;
}

// Arrow function
function outerArrow() {
  const x = 1;
  const inner = () => x;
  return inner;
}

// All three inner functions close over x. Same idea, different syntax.
const a = outerDecl()();
const b = outerExpr()();
const c = outerArrow()();

console.log(a, b, c);  // 1 1 1
```
