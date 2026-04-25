Write a higher-order function `makeConstant(value)` that returns a function.
That returned function should always return `value`.
?

```javascript
function makeConstant(value) {
  // TODO
}

const always5 = makeConstant(5);
console.log(always5()); // 5
console.log(always5()); // 5

const alwaysHi = makeConstant("hi");
console.log(alwaysHi()); // "hi"
```

