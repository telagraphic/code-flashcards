Create a higher-order function `withPrefix(prefix)` that returns a wrapper for any function `fn`, logging the prefix before calling `fn`.
?

```javascript
function withPrefix(prefix) {
  return function (fn) {
    return function (...args) {
      // TODO
    };
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withPrefix("[math]")(add);
console.log(loggedAdd(1, 2)); // should log: [math] then output: 3

// Extra checks
const loggedJoin = withPrefix("[join]")((...xs) => xs.join("-"));
console.log(loggedJoin("a", "b", "c")); // should log: [join] then output: a-b-c
```

