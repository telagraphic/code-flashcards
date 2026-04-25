Write a higher-order function `wrapResult(fn)` that returns a new function.
When the returned function is called, it should call `fn` and return the result wrapped in an object: `{ value: result }`.
?

```javascript
function wrapResult(fn) {
  // TODO
}

const wrappedRandom = wrapResult(() => 7);
console.log(wrappedRandom()); // { value: 7 }

const wrappedAdd = wrapResult((a, b) => a + b);
console.log(wrappedAdd(1, 2)); // { value: 3 }
```

