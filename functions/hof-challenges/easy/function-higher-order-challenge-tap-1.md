Create a higher-order function `tap(effect)` that returns a function.
That returned function should:
- call `effect(value)` for side effects
- return `value` unchanged
?

```javascript
function tap(effect) {
  // TODO
}

const log = tap((x) => console.log("saw:", x));

console.log(log(10)); // logs "saw: 10", then prints 10
console.log(log("hi")); // logs "saw: hi", then prints "hi"

// Extra check: use it inside a chain
const result = [1, 2,  3]
  .map((n) => n * 2)
  .map(tap((n) => console.log("after double:", n)))
  .reduce((a, b) => a + b, 0);

console.log(result); // 12
```

