Create a higher-order function `negate(predicate)` that returns a new predicate which flips the boolean result.
?

```javascript
function negate(predicate) {
  return function() {
    const result = predicate();
  }
}

const isOdd = (n) => n % 2 === 1;
const isEven = negate(isOdd);

console.log(isOdd(5));  // true
console.log(isEven(5)); // false
console.log(isEven(4)); // true

// Extra check: works with string predicates
const isEmpty = (s) => s.length === 0;
const isNotEmpty = negate(isEmpty);
console.log(isNotEmpty(""));    // false
console.log(isNotEmpty("hey")); // true
```

