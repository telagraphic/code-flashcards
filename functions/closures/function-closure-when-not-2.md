When does a function not "close over" anything useful?
?

```javascript
// 1. Pure function: only uses its parameters and locals
function add(a, b) {
  return a + b;  // no outer variables — no closure
}

// 2. Callback that only uses globals or its own args
document.addEventListener('click', function(e) {
  console.log(e.target);  // e is parameter; no outer vars — no closure
});

// 3. Method that only uses this and parameters
const obj = {
  value: 10,
  getValue: function() {
    return this.value;  // this is not lexical scope — not a closure over outer vars
  }
};

// 4. Inner function that could close over outer, but doesn't use it
function outer() {
  const unused = 100;
  return function(n) {
    return n * 2;  // doesn't use unused — no closure over outer
  };
}

// Closure = inner function *uses* outer variables *and* outlives that scope.
```
