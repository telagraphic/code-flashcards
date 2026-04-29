Write a recursive function `factorial(n)` that returns \(n!\).

Constraints:

- Assume `n` is an integer \(\ge 0\)
- `factorial(0)` should be `1`
- Do not use loops
?

```js
function factorial(n) {
  // TODO
}

console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(5)); // 120
```

---

```js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
```

