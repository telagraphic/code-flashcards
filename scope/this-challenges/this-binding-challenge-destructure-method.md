What is logged — does `read()` succeed or throw? If it logs, what value?
?

```javascript
"use strict";

const store = {
  id: 42,
  read() {
    return this.id;
  },
};

const { read } = store;
console.log(read());
```

**Answer:** It **throws** in strict mode (e.g. `TypeError: Cannot read properties of undefined (reading 'id')`). Destructuring copies the **function value** only; the call `read()` is a **bare call**, so `this` is **`undefined`**.
