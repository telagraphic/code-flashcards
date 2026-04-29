Write a recursive function `sumArray(nums)` that returns the sum of all numbers in the array.
Do not use loops (`for`, `while`) or `reduce`.
?

```js
function sumArray(nums) {
  // TODO
}

console.log(sumArray([])); // 0
console.log(sumArray([5])); // 5
console.log(sumArray([1, 2, 3, 4])); // 10
```

---

```js
function sumArray(nums) {
  function go(i) {
    if (i === nums.length) return 0;
    return nums[i] + go(i + 1);
  }

  return go(0);
}
```

