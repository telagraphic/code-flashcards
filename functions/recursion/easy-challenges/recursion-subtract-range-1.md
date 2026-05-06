Write a recursive function `subtractRange(a, b)` that returns:

- \(a - (a+1) - (a+2) - ... - b\) when \(a \le b\)
- \(a - (a-1) - (a-2) - ... - b\) when \(a \ge b\)

Do not use loops.
?

```js
function subtractRange(a, b) {
  // TODO
}

console.log(subtractRange(5, 5)); // 5
console.log(subtractRange(5, 7)); // 5 - 6 - 7 = -8
console.log(subtractRange(7, 5)); // 7 - 6 - 5 = -4
```

---

```js
function subtractRange(a, b) {
  if (a === b) return a;
  if (a < b) return a - subtractRange(a + 1, b);
  return a - subtractRange(a - 1, b);
}
```

