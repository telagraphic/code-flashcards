Inside the `setTimeout` **arrow** callback, what is `this` when it runs (`"use strict"` at top of script)?
?

```javascript
"use strict";

const svc = {
  name: "svc",
  start() {
    setTimeout(() => {
      // <-- when this runs: what is `this`?
      console.log(this.name);
    }, 0);
  },
};

svc.start();
```

**Answer:** The **`svc` object**. Arrow functions do not receive a fresh `this` from `setTimeout`; they close over the `this` of `start`, and `start` was invoked as `svc.start()`, so `this` in `start` is `svc`.
