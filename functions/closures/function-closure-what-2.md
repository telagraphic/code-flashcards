What two things are needed for a closure?
?

```javascript
// 1. A function defined inside another function (or another scope)
// 2. The inner function uses a variable from the outer scope
//    (and is used outside that outer scope, so the outer scope would otherwise be gone)

function outer() {
  const secret = 42;        // Outer variable
  
  function inner() {
    return secret;          // Inner uses outer variable
  }
  
  return inner;             // Inner is used outside outer
}

const getSecret = outer();
console.log(getSecret());   // 42

// outer() has finished, but inner still "closes over" secret.
// No closure: inner doesn't use any outer variables.
// No closure: inner is never used outside outer (outer scope could be GC'd normally).
```
