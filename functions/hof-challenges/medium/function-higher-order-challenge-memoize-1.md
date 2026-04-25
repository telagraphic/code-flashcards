Create a higher-order function `memoize(fn, keyFn?)` that caches results.
If the returned function is called again with the same key, it should return the cached result instead of calling `fn`.
?

```javascript
function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  // TODO
}

let calls = 0;
const slowDouble = (n) => {
  calls++;
  return n * 2;
};

const fastDouble = memoize(slowDouble);
console.log(fastDouble(10)); // 20
console.log(fastDouble(10)); // 20
console.log(calls); // 1

// Extra check: multiple different keys should compute separately
console.log(fastDouble(11)); // 22
console.log(calls); // 2
```

