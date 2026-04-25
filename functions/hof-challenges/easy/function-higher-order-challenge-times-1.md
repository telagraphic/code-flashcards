Create a higher-order function `times(n, fn)` that calls `fn` \(n\) times and returns an array of results.
`fn` should receive the current index \(0..n-1\).
?

```javascript
function times(n, fn) {
  // TODO
}

console.log(times(0, (i) => i)); // []
console.log(times(3, (i) => i)); // [0, 1, 2]
console.log(times(4, (i) => i * 2)); // [0, 2, 4, 6]

// Extra check: building strings
console.log(times(3, (i) => `item-${i}`)); // ["item-0", "item-1", "item-2"]
```

