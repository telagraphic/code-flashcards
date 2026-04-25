What happens at `new Widget()` and why?
?

```javascript
function factory() {
  return new Widget(); // <- what happens?
  class Widget {
    constructor() {
      this.kind = "widget";
    }
  }
}

factory();
```

**Answer:** It throws **`ReferenceError: Cannot access 'Widget' before initialization`**. `class Widget {}` creates a block-scoped binding with **TDZ behavior** (like `let`/`const`). The binding exists in the scope as soon as the scope is created, but it’s uninitialized until execution reaches the class declaration.
