Write a higher-order function `apply(fn, value)` that calls `fn(value)` and returns the result.
This helps you practice “function as data”.
?

```javascript
function apply(fn, value) {
  // TODO
}

console.log(apply((n) => n * 2, 10)); // 20
console.log(apply((s) => s.toUpperCase(), "hey")); // "HEY"
```

function apply(fn, value) {
  return fn(value;)
}