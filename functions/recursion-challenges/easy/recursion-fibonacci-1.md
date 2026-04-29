Write a function `fibonacci(n)` that returns the \(n\)th Fibonacci number.

Use recursion, but avoid the exponential-time “naive recursion” solution by adding memoization.

Constraints:

- Assume `n` is an integer \(\ge 0\)
- Use `fibonacci(0) = 0`, `fibonacci(1) = 1`
?

```js
function fibonacci(n) {
  // TODO
}

console.log(fibonacci(0)); // 0
console.log(fibonacci(1)); // 1
console.log(fibonacci(6)); // 8
console.log(fibonacci(10)); // 55
```

---

```js
function fibonacci(n) {
  const memo = new Map([
    [0, 0],
    [1, 1],
  ]);

  function go(k) {
    if (memo.has(k)) return memo.get(k);
    const value = go(k - 1) + go(k - 2);
    memo.set(k, value);
    return value;
  }

  return go(n);
}
```

