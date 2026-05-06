Write a recursive function `binarySearch(sortedNums, target)` that returns the index of `target` in a sorted array, or `-1` if not found.

Constraints:

- `sortedNums` is sorted ascending
- Do not use loops
?

```js
function binarySearch(sortedNums, target) {
  // TODO
}

console.log(binarySearch([], 3)); // -1
console.log(binarySearch([1, 3, 5, 7, 9], 7)); // 3
console.log(binarySearch([1, 3, 5, 7, 9], 2)); // -1
```

---

```js
function binarySearch(sortedNums, target) {
  function go(lo, hi) {
    if (lo > hi) return -1;
    const mid = Math.floor((lo + hi) / 2);
    const v = sortedNums[mid];
    if (v === target) return mid;
    if (v < target) return go(mid + 1, hi);
    return go(lo, mid - 1);
  }

  return go(0, sortedNums.length - 1);
}
```

