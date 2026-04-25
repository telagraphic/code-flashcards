Write a higher-order function `withDefaultArg(fn, defaultValue)` that returns a new function.
If the returned function is called with `undefined`, it should call `fn(defaultValue)`.
Otherwise it should call `fn(value)`.
?

```javascript
function withDefaultArg(fn, defaultValue) {
  // TODO
}

const double = (n) => n * 2;
const doubleOr10 = withDefaultArg(double, 10);

console.log(doubleOr10(3)); // 6
console.log(doubleOr10(undefined)); // 20
```

