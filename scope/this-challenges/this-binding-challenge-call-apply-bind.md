What are the three `console.log` values for `this.x` (in order)?
?

```javascript
"use strict";

function show() {
  return this.x;
}

const a = { x: 1 };
const b = { x: 2 };

const bound = show.bind(a);

console.log(show.call(b));   // first
console.log(bound.call(b)); // second
console.log(show.apply(a, [])); // third
```

**Answer:** `2`, then `1`, then `1`.  
- First: `call(b)` supplies **`b`** as `this`.  
- Second: **`bind` wins** over `call`—a bound function ignores a new `this` from `call`/`apply` (only `new` can override in the special bound-constructor case).  
- Third: `apply(a)` sets **`a`**.
