Write a recursive function `permutations(items)` that returns all permutations of the input array.

Constraints:

- Assume all items are distinct
- Do not use loops (you can use recursion + array methods)
?

```js
function permutations(items) {
  // TODO
}

console.log(permutations([])); // [[]]
console.log(permutations([1])); // [[1]]

// order doesn't matter; these are the 6 permutations:
// [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]
console.log(permutations([1, 2, 3]).length); // 6
```

---

```js
function permutations(items) {
  if (items.length === 0) return [[]];

  const [first, ...rest] = items;
  const perms = permutations(rest);

  function insertEverywhere(arr, value, i = 0) {
    if (i > arr.length) return [];
    const withValue = arr.slice(0, i).concat([value], arr.slice(i));
    return [withValue].concat(insertEverywhere(arr, value, i + 1));
  }

  function mapConcat(list, fn, i = 0) {
    if (i === list.length) return [];
    return fn(list[i]).concat(mapConcat(list, fn, i + 1));
  }

  return mapConcat(perms, (p) => insertEverywhere(p, first));
}
```

