What does `m()` return (strict mode)?
?

```javascript
"use strict";

class Base {
  v = 1;
  m() {
    return this.v;
  }
}

class Derived extends Base {
  v = 2;
  m() {
    return super.m();
  }
}

console.log(new Derived().m());
```

**Answer:** **`2`**. `super.m()` calls `Base.prototype.m` with **`this` set to the derived instance** (the same `this` as inside `Derived.m`). So `this.v` resolves on the instance; the own field from `Derived` shadows and yields **2**, not 1.
