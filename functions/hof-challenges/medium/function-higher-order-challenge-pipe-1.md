Create a higher-order function `pipe(...fns)` that returns a function.
`pipe(f, g, h)(x)` should compute `h(g(f(x)))` (left-to-right).
?

```javascript
function pipe(...fns) {
  // TODO
}

const add1 = (n) => n + 1;
const double = (n) => n * 2;
const toStr = (n) => String(n);

console.log(pipe(add1, double)(3)); // double(add1(3)) -> 8
console.log(pipe(add1, double, toStr)(3)); // "8"

// Bonus check: allow multiple args for the first function only
const sum = (a, b) => a + b;
console.log(pipe(sum, double)(2, 3)); // double(sum(2, 3)) -> 10
```

