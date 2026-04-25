What object is `===` to `this` inside `tag()` when `chain.a.b.tag()` runs?
?

```javascript
"use strict";

const chain = {
  a: {
    b: {
      tag() {
        return this;
      },
    },
  },
};

console.log(chain.a.b.tag() === chain.a.b);
```

**Answer:** **`true`**. For a call `receiver.method()`, **`this` is the receiver**—the value **before the final property access** that yielded the function. Here that receiver is **`chain.a.b`**, not `chain` or `chain.a`.
