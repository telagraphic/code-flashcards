Create a higher-order function `compose(...fns)` that returns a function.
`compose(f, g, h)(x)` should compute `f(g(h(x)))`.
?

```javascript
function compose(...fns) {
  // TODO
}

const add1 = (n) => n + 1;
const double = (n) => n * 2;
const square = (n) => n * n;

console.log(compose(double, add1)(3)); // double(add1(3)) -> 8
console.log(compose(square, add1)(4)); // square(add1(4)) -> 25

// Extra check: compose() with no functions should behave like identity
console.log(compose()(123)); // 123
```

