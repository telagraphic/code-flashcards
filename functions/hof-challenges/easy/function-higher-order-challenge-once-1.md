Create a higher-order function `once(fn)` that returns a function which only runs `fn` the first time.
Later calls should return the exact same result from the first call (and not call `fn` again).
?

```javascript
function once(fn) {
  // TODO
}

let count = 0;
const getValueOnce = once(() => {
  count++;
  return Math.random();
});

const a = getValueOnce();
const b = getValueOnce();
const c = getValueOnce();

console.log(a === b && b === c); // true
console.log(count); // 1

// Extra check: it should pass arguments on the first call
const addOnce = once((x, y) => x + y);
console.log(addOnce(1, 2)); // 3
console.log(addOnce(100, 200)); // still 3
```

