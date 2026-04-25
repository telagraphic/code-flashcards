What is logged (two lines)?
?

```javascript
"use strict";

function make() {
  const outer = {
    name: "outer",
    inner: {
      name: "inner",
      speak: () => this?.name,
      talk() {
        return this.name;
      },
    },
  };
  return [outer.inner.speak(), outer.inner.talk()];
}

console.log(make());
```

**Answer:** **`[undefined, "inner"]`**.  
- `speak` is an **arrow** created while `make` runs. `make()` was invoked as a **bare call**, so **`this` inside `make` is `undefined`**, and the arrow inherits that. Hence `this?.name` is **`undefined`**.  
- `talk` is a **normal method**; when called as `outer.inner.talk()`, **`this` is `inner`**, so you get **`"inner"`**.
