Write a recursive function `reverseString(s)` that returns the reversed string.

Constraints:

- Do not use loops
- Do not use `split().reverse().join()`
?

```js
function reverseString(s) {
  // TODO
}

console.log(reverseString("")); // ""
console.log(reverseString("a")); // "a"
console.log(reverseString("abc")); // "cba"
console.log(reverseString("racecar")); // "racecar"
```

---

```js
function reverseString(s) {
  if (s.length <= 1) return s;
  return s[s.length - 1] + reverseString(s.slice(0, -1));
}
```

