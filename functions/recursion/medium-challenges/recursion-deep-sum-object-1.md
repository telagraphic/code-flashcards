Write a recursive function `deepSum(value)` that sums all numbers inside a nested structure.

Rules:

- If `value` is a number, include it.
- If `value` is an array, traverse its items.
- If `value` is a plain object, traverse its property values.
- Ignore non-numbers (strings, booleans, null, etc.).
- Do not use loops.
?

```js
function deepSum(value) {
  // TODO
}

console.log(deepSum(5)); // 5
console.log(deepSum([1, "x", [2, 3]])); // 6
console.log(deepSum({ a: 1, b: { c: 2, d: "nope" }, e: [3, 4] })); // 10
```

---

```js
function deepSum(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value == null) return 0;

  if (Array.isArray(value)) {
    if (value.length === 0) return 0;
    return deepSum(value[0]) + deepSum(value.slice(1));
  }

  if (typeof value === "object") {
    const values = Object.values(value);
    if (values.length === 0) return 0;
    return deepSum(values[0]) + deepSum(values.slice(1));
  }

  return 0;
}
```

