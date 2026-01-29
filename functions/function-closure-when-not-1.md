When is it NOT a closure?
?

```javascript
// 1. Inner function does NOT use any variable from outer scope
function noClosure1() {
  const x = 10;
  return function(a, b) {
    return a + b;   // x never used — no closure over outer scope
  };
}

// 2. Function is top-level (no outer function scope to close over)
const globalVar = 1;
function topLevel() {
  return globalVar;  // global scope, not "outer function" — often not called a closure
}

// 3. Inner function never escapes the outer scope
function noClosure3() {
  let count = 0;
  function inner() {
    count++;
    return count;
  }
  inner();  // only called here
  inner();
  return 42;  // inner never returned or passed out — closure exists but isn't "used" as such
}

// 4. IIFE that doesn't return or pass out a function
(function() {
  const secret = 99;
  console.log(secret);  // no inner function, no closure
})();
```
