When `read` runs on the marked line, what is `this` (strict mode)?
?

```javascript
"use strict";

const account = {
  id: 7,
  read() {
    return this?.id;
  },
};

const read = account.read;
read(); // <-- this line: what is `this`?
```

**Answer:** `undefined`. This is a **bare call**; the method is detached from `account`, so there is no receiver. Optional chaining on `this` is not needed for the crash here—accessing `this.id` would throw in strict mode; `this?.id` safely yields `undefined`.
