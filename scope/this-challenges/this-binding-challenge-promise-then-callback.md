What is logged for `this` inside the `.then` callback (strict mode)?
?

```javascript
"use strict";

const svc = { name: "svc" };

Promise.resolve(1)
  .then(function () {
    console.log(this?.name);
  });
```

**Answer:** **`undefined`** (so `this?.name` is `undefined`). The engine invokes the fulfillment callback with **`undefined`** as the `this` argument (Promise job conventions). It is **not** automatically `svc` just because `then` was chained off a promise created near `svc`.
