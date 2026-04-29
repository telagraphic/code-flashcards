Write a recursive function `flattenArray(value)` that flattens arbitrarily nested arrays.

Constraints:

- `value` can be a non-array (return `[value]`)
- Do not use `flat(Infinity)`
- Do not use loops
?

```js
function flattenArray(value) {
  // TODO
}

console.log(flattenArray(1)); // [1]
console.log(flattenArray([1, 2, 3])); // [1,2,3]
console.log(flattenArray([1, [2, [3, 4]], 5])); // [1,2,3,4,5]
```

---

```js
function flattenArray(value) {
  if (!Array.isArray(value)) return [value];
  if (value.length === 0) return [];
  return flattenArray(value[0]).concat(flattenArray(value.slice(1)));
}
```

