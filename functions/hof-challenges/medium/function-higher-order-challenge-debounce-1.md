Create a higher-order function `debounce(fn, ms)` that returns a debounced version of `fn`.
The debounced function should wait until it hasn’t been called for `ms` milliseconds, then call `fn` once with the latest arguments.
?

```javascript
function debounce(fn, ms) {
  // TODO
}

let count = 0;
const inc = () => {
  count++;
};

const debouncedInc = debounce(inc, 50);

debouncedInc();
debouncedInc();
debouncedInc();

setTimeout(() => {
  console.log(count); // should be 1
}, 80);

// Extra check: latest args win
let last;
const setLast = (x) => {
  last = x;
};

const debouncedSetLast = debounce(setLast, 30);
debouncedSetLast("a");
debouncedSetLast("b");
setTimeout(() => {
  console.log(last); // should be "b"
}, 60);
```

